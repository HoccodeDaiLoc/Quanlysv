import { RentalRecord } from "../models/RentalRecord";
import { RentalRecordRepository } from "../repository/RentalRecordRepository";
import { IRentalRecordRepository } from "../repository/Interfaces/IRentalRecordRepository";
import { Service, Inject } from "typedi";
import { AppError } from "../errors/AppError";

@Service()
export class RentalRecordService implements RentalRecordService {
  @Inject(() => RentalRecordRepository)
  rentalRecordRepository!: IRentalRecordRepository;

  async createRentalRecord(
    checkInDate: Date,
    checkOutDate: Date | undefined,
    roomId: number,
    renterId: number
  ): Promise<RentalRecord> {
    try {
      return await this.rentalRecordRepository.createRentalRecord(
        checkInDate,
        checkOutDate,
        roomId,
        renterId
      );
    } catch (err) {
      throw err;
    }
  }

  async updateRentalRecordByRoomId(
    roomId: number,
    rentalRecord: RentalRecord
  ): Promise<RentalRecord> {
    try {
      const searchCondition = {roomId: roomId};
      if (!(await this.rentalRecordRepository.getRental(searchCondition))) {
        throw new AppError("Rental Record not found", 404);
      }
      return await this.rentalRecordRepository.updateRentalRecordByRoomId(
        roomId,
        rentalRecord
      );
    } catch (err) {
      throw err;
    }
  }

  async updateRentalRecordByRenterId(
    renterId: number,
    data: any
  ): Promise<RentalRecord> {
    try {
      const searchCondition = {renterId: renterId};
      if (!(await this.rentalRecordRepository.getRental(searchCondition))) {
        throw new AppError("Rental Record not found", 404);
      }
      return await this.rentalRecordRepository.updateRentalRecordByRenterId(
        renterId,
        data
      );
    } catch (err) {
      throw err;
    }
  }

  async deleteRentalRecord(id: number): Promise<boolean> {
    try {
      const searchCondition = {id: id}
      if (!(await this.rentalRecordRepository.getRental(searchCondition))) {
        throw new AppError("Rental Record not found", 404);
      }
      return await this.rentalRecordRepository.deleteRentalById(id);
    } catch (err) {
      throw err;
    }
  }

  async checkRenterExistInRoom(renterId: number, roomId: number, newStartDate: Date) {
    try {
      return this.rentalRecordRepository.checkRenterExistInRoom(renterId, roomId, newStartDate);
    } catch (err) {
      throw err;
    }
  }
}
