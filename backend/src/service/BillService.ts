import { Inject, Service } from "typedi";
import { Bill } from "../models/Bill";
import { IBillService } from "./Interfaces/IBillService";
import { BillRepository } from "../repository/BillRepository";
import { IBillRepository } from "../repository/Interfaces/IBillRepository";
import { BillItem } from "../models/BillItem";
import { BillItemRepository } from "../repository/BillItemRepository";
import { IBillItemRepository } from "../repository/Interfaces/IBillItemRepository";
import { AppError } from "../errors/AppError";
import { RoomRepository } from "../repository/RoomRepository";
import { IRoomRepository } from "../repository/Interfaces/IRoomRepository";
import { ElectricReadingRepository } from "../repository/ElectricReadingRepository";
import { IElectricReadingRepository } from "../repository/Interfaces/IElectricReadingRepository";
import { WaterReadingController } from "../controllers/WaterReadingController";
import { WaterRepository } from "../repository/WaterRepository";
import { IWaterRepository } from "../repository/Interfaces/IWaterRepository";
import { RentalRecordRepository } from "../repository/RentalRecordRepository";
import { IRentalRecordRepository } from "../repository/Interfaces/IRentalRecordRepository";
import { NotificationService } from "./NotificationService";
import { INotificationService } from "./Interfaces/INotificationService";
import { Notification } from "../models/Notification";
import { Renter } from "../models/Renter";
import { RenterRepository } from "../repository/RenterRepository";
import { IRenterRepository } from "../repository/Interfaces/IRenterRepository";
import fs from "fs";
import path from "path";
import EmailService from "../utils/Email";

@Service()
export class BillService implements IBillService {
  @Inject(() => BillRepository)
  private billRepository!: IBillRepository;

  @Inject(() => BillItemRepository)
  private billItemRepository!: IBillItemRepository;

  @Inject(() => RoomRepository)
  private roomRepository!: IRoomRepository;

  @Inject(() => ElectricReadingRepository)
  private electricReadingRepository!: IElectricReadingRepository;

  @Inject(() => WaterRepository)
  private waterRepository!: IWaterRepository;

  @Inject(() => RentalRecordRepository)
  private rentalRecordRepository!: IRentalRecordRepository;

  @Inject(() => RenterRepository)
  private renterRepository!: IRenterRepository;

  @Inject(() => NotificationService)
  private notificationService!: INotificationService;

  private async checkBillExist(
    roomId: number,
    billStartDate: Date,
    billEndDate: Date
  ): Promise<boolean> {
    try {
      const bill = await this.billRepository.getBill({
        roomId,
        billStartDate,
        billEndDate,
      });
      return !!bill;
    } catch (err) {
      throw err;
    }
  }

  async createBill(
    billStartDate: Date,
    billEndDate: Date,
    payMethod: string,
    billStatus: string,
    billItem: any[],
    roomId: number
  ): Promise<{ bill: Bill; notification: Notification }> {
    let bill: Bill | undefined;
    try {
      if (await this.checkBillExist(roomId, billStartDate, billEndDate)) {
        throw new AppError("Bill already exist", 400);
      }
      bill = await this.billRepository.createBill(
        billStartDate,
        billEndDate,
        0,
        payMethod,
        billStatus,
        roomId
      );

      let total = 0;
      const billItemsObject = await Promise.all(
        billItem.map(async ({ itemName, unitPrice }) => {
          let totalAmont: number = 0;
          let quantity: number = 0;
          if (itemName === "Phòng") {
            const room = await this.roomRepository.getRoomById(roomId);
            if (!room) {
              throw new AppError("Room not found", 404);
            }
            unitPrice = room.price;
            quantity = 1;
            totalAmont = unitPrice;
          } else if (itemName === "Điện") {
            const lastestElectricReading =
              await this.electricReadingRepository.getLatestElectricReading(
                roomId
              );
            if (
              lastestElectricReading &&
              new Date(lastestElectricReading.electricRecordDate).getTime() !==
                billEndDate.getTime()
            ) {
              throw new AppError("Vui lòng nhập số điện tháng này", 404);
            }
            const lastElectricReading =
              await this.electricReadingRepository.getLastElectricReading(
                roomId
              );
            quantity =
              lastestElectricReading!.electricNumber -
              lastElectricReading!.electricNumber;
            totalAmont = quantity * unitPrice;
          } else if (itemName === "Nước") {
            const lastestWaterReading =
              await this.waterRepository.getLastestWaterReading(roomId);
            if (
              lastestWaterReading &&
              new Date(lastestWaterReading.waterRecordDate).getTime() !==
                billEndDate.getTime()
            ) {
              throw new AppError("Vui lòng nhập số nước tháng này", 404);
            }
            const lastWaterReading =
              await this.waterRepository.getLastWaterReading(roomId);
            quantity =
              lastestWaterReading!.waterNumber - lastWaterReading!.waterNumber;
            totalAmont = quantity * unitPrice;
          }
          total += totalAmont;
          await this.billItemRepository.createBillItem(
            itemName,
            quantity,
            unitPrice,
            totalAmont,
            bill!.billId
          );
        })
      );
      const newBill = await this.billRepository.updateBillByID(bill.billId, {
        total,
      });
      const renters = await this.renterRepository.getAllRenterOfRoom(
        roomId,
        100,
        1
      );
      const renterIds = renters.rows.map((renter) => {
        const renterObject = renter.toJSON() as Renter;
        return renterObject.renterId;
      });
      const dateStart = new Date(billStartDate);
      let dayStart = String(dateStart.getDate()).padStart(2, "0");
      let monthStart = String(dateStart.getMonth() + 1).padStart(2, "0");
      let yearStart = dateStart.getFullYear();
      const billStartDateString = `${dayStart}/${monthStart}/${yearStart}`;
      const dateEnd = new Date(billEndDate);
      let dayEnd = String(dateEnd.getDate()).padStart(2, "0");
      let monthEnd = String(dateEnd.getMonth() + 1).padStart(2, "0");
      let yearEnd = dateEnd.getFullYear();
      const billEndDateString = `${dayEnd}/${monthEnd}/${yearEnd}`;
      const newNotification = await this.notificationService.createNotification(
        "Hóa đơn mới",
        `Hóa đơn mới cho phòng ${roomId} từ ngày ${billStartDateString} đến ${billEndDateString} với tổng số tiền là ${total}`,
        new Date(),
        renterIds,
        undefined
      );
      const notification = await this.notificationService.getNotification({
        notificationId: newNotification!.notificationId,
      });
      return { bill: newBill, notification: notification };
    } catch (err) {
      if (bill) {
        await this.billRepository.deleteBillById(bill.billId);
      }
      throw err;
    }
  }

  async getBill(searchCondidate: any): Promise<Bill> {
    try {
      const bill = await this.billRepository.getBill(searchCondidate);
      if (!bill) {
        throw new AppError("Bill not found", 404);
      }
      return bill;
    } catch (err) {
      throw err;
    }
  }

  async getListBill(
    searchCondidate: any,
    limit: number,
    page: number
  ): Promise<{ rows: Bill[]; count: number }> {
    try {
      const bills = await this.billRepository.getListBill(
        searchCondidate,
        limit,
        page
      );
      if (bills?.count === 0) {
        throw new AppError("Bill not found", 404);
      }
      return bills!;
    } catch (err) {
      throw err;
    }
  }

  async getBillByRenter(
    renterId: number,
    status: string,
    limit: number,
    page: number
  ): Promise<{ rows: Bill[]; count: number }> {
    try {
      const rentalRecord = await this.rentalRecordRepository.getRental({
        renterId: renterId,
      });
      if (!rentalRecord) {
        throw new AppError("Rental record not found", 404);
      }
      const bills = await this.billRepository.getBillEndDateWithTimeFrame(
        rentalRecord.checkInDate,
        rentalRecord.checkOutDate,
        status,
        limit,
        page,
        { roomId: rentalRecord.roomId }
      );
      if (bills?.count === 0) {
        throw new AppError("Bill not found", 404);
      }
      return bills!;
    } catch (err) {
      throw err;
    }
  }

  async getBillByRoom(
    roomId: number,
    status: string,
    limit: number,
    page: number
  ): Promise<{ rows: Bill[]; count: number }> {
    try {
      const searchCondidate: {
        roomId: number;
        status?: string;
      } = {
        roomId,
      };
      if (status) {
        searchCondidate.status = status;
      }
      const bills = await this.billRepository.getListBill(
        searchCondidate,
        limit,
        page
      );
      if (bills?.count === 0) {
        throw new AppError("Bill not found", 404);
      }
      return bills!;
    } catch (err) {
      throw err;
    }
  }

  async updateBillById(billId: number, data: any): Promise<Bill> {
    try {
      const bill = await this.billRepository.updateBillByID(billId, data);
      if (!bill) {
        throw new AppError("Bill not found", 404);
      }
      return bill!;
    } catch (err) {
      throw err;
    }
  }

  async deleteBillById(billId: number): Promise<boolean> {
    try {
      const bill = await this.billRepository.deleteBillById(billId);
      if (!bill) {
        throw new AppError("Bill not found", 404);
      }
      return true;
    } catch (err) {
      throw err;
    }
  }

  async sendMail(billId: number) {
    const bill = await this.billRepository.getBill({ billId });
    if(bill === null) {
      throw new AppError("Bill not found", 404);
    }
    const renters = await this.renterRepository.getAllRenterOfRoom(bill.roomId, 100, 1);
    const templatePath = path.join(
      __dirname,
      "../utils/bill.html"
    );
    const subject = "Hóa đơn mới";
    const renterIds = renters.rows.map((renter) => {
      const renterObject = renter.toJSON() as Renter;
      const email = renterObject.email;
      
    });

    let htmlContent = fs.readFileSync(templatePath, "utf8");
    // await EmailService.getInstance().sendMail(
    //   email,
    //   subject,
    //   undefined,
    //   htmlContent
    // );
  }
}