import { Bill } from "../models/Bill";
import { IBillRepository } from "./Interfaces/IBillRepository";
import { BaseRepository } from "./BaseRepository";
import { BillItem } from "../models/BillItem";
import { Service } from "typedi";
import { AppError } from "../errors/AppError";
import { Op } from "sequelize";

@Service()
export class BillRepository
  extends BaseRepository<Bill>
  implements IBillRepository
{
  async createBill(
    billStartDate: Date,
    billEndDate: Date,
    total: number,
    payMethod: string,
    billStatus: string,
    roomId: number
  ): Promise<Bill> {
    try {
      const bill = await Bill.create({
        billStartDate,
        billEndDate,
        total,
        paymentMethod: payMethod,
        status: billStatus,
        roomId,
      });
      return bill;
    } catch (err) {
      throw err;
    }
  }

  async getBill(searchCondidate: any): Promise<Bill | null> {
    try {
      const bill = await Bill.findOne({
        where: searchCondidate,
        include: [
          {
            model: BillItem,
            attributes: { exclude: ["billId"] },
          },
        ],
      });
      return bill;
    } catch (err) {
      throw err;
    }
  }

  async updateBillByID(id: number, data: any): Promise<Bill> {
    try {
      const bill = await Bill.update(data, {
        where: { billId: id },
      });
      const updatedBill = await this.getBill({ billId: id });
      return updatedBill!;
    } catch (err) {
      throw err;
    }
  }

  async getListBill(
    searchCondidate: any,
    limit: number,
    page: number
  ): Promise<{ rows: Bill[]; count: number } | null> {
    try {
      const bills = await Bill.findAndCountAll({
        where: searchCondidate,
        include: [
          {
            model: BillItem,
            attributes: { exclude: ["billId"] },
          },
        ],
        limit: limit,
        offset: (page - 1) * limit,
        distinct: true,
      });
      return bills;
    } catch (err) {
      throw err;
    }
  }

  async getBillAfterDate(
    date: Date,
    status: string | undefined,
    limit: number,
    page: number
  ): Promise<{ rows: Bill[]; count: number } | null> {
    try {
      const bills = await Bill.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        where: {
          billStartDate: {
            [Op.gte]: date,
          },
          status: status,
        },
        include: {
          model: BillItem,
          attributes: { exclude: ["billId"] },
        },
        distinct: true,
      });
      return bills;
    } catch (err) {
      throw err;
    }
  }

  async getBillBeforeDate(
    date: Date,
    limit: number,
    page: number
  ): Promise<{ rows: Bill[]; count: number } | null> {
    try {
      const bills = await Bill.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        where: {
          billEndDate: {
            [Op.lte]: date,
          },
        },
        include: {
          model: BillItem,
          attributes: { exclude: ["billId"] },
        },
        distinct: true,
      });
      return bills;
    } catch (err) {
      throw err;
    }
  }

  async getBillWithTimeFrame(
    startDate: Date,
    endDate: Date,
    status: string | undefined,
    limit: number,
    page: number,
    searchCondidate: any
  ): Promise<{ rows: Bill[]; count: number } | null> {
    try {
      let whereClause: {
        status?: string;
        billStartDate?: any;
        billEndDate?: any;
        roomId?: number;
      } = {
        billStartDate: {
          [Op.gte]: startDate,
        },
      };
      if (endDate) {
        whereClause["billEndDate"] = {
          [Op.lte]: endDate,
        };
      }
      if (status) {
        whereClause["status"] = status;
      }
      for (let key in searchCondidate) {
        if (key === "roomId") {
          whereClause[key] = searchCondidate[key];
        }
      }
      const bills = await Bill.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        where: whereClause,
        include: {
          model: BillItem,
          attributes: { exclude: ["billId"] },
        },
        distinct: true,
      });
      return bills;
    } catch (err) {
      throw err;
    }
  }

  async getBillEndDateWithTimeFrame(
    startDate: Date,
    endDate: Date,
    status: string | undefined,
    limit: number,
    page: number,
    searchCondidate: any
  ): Promise<{ rows: Bill[]; count: number } | null> {
    try {
      let whereClause: {
        status?: string;
        billStartDate?: any;
        billEndDate?: any;
        roomId?: number;
      } = {
        billEndDate: {
          [Op.gte]: startDate,
        },
      };
      if (endDate) {
        whereClause["billEndDate"] = {
          [Op.lte]: endDate,
        };
      }
      if (status) {
        whereClause["status"] = status;
      }
      for (let key in searchCondidate) {
        if (key === "roomId") {
          whereClause[key] = searchCondidate[key];
        }
      }
      const bills = await Bill.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        where: whereClause,
        include: {
          model: BillItem,
          attributes: { exclude: ["billId"] },
        },
        distinct: true,
      });
      return bills;
    } catch (err) {
      throw err;
    }
  }

  async deleteBillById(id: number): Promise<boolean> {
    try {
      const deletedBill = await Bill.destroy({
        where: { billId: id },
      });
      return deletedBill > 0;
    } catch (err) {
      throw err;
    }
  }
}
