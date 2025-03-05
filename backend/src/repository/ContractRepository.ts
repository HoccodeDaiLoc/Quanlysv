import { Service } from "typedi";
import { Contract } from "../models/Contract";
import { BaseRepository } from "./BaseRepository";
import { IContractRepository } from "./Interfaces/IContractRepository";
import { Renter } from "../models/Renter";

@Service()
export class ContractRepository
  extends BaseRepository<Contract>
  implements IContractRepository
{
  async create(
    startDay: Date,
    endDate: Date | undefined,
    deposit_amount: number | undefined,
    roomId: number,
    renterId: number
  ): Promise<Contract> {
    try {
      return Contract.create({
        startDay,
        endDate,
        depositAmount: deposit_amount,
        roomId,
        renterId,
      });
    } catch (err) {
      throw err;
    }
  }

  async deleteById(id: number): Promise<boolean> {
    try {
      const deletedContract = await Contract.destroy({
        where: {
          id: id,
        },
      });
      return deletedContract ? true : false;
    } catch (err) {
      throw err;
    }
  }

  async getAll(limit: number, page: number): Promise<{rows:Contract[], count: number}> {
    try {
      return await Contract.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        include: {
          model: Renter,
        }
      });
    } catch (err) {
      throw err;
    }
  }

  async getById(id: number): Promise<Contract | null> {
    try {
      return await Contract.findOne({
        where: {
          id: id,
        },
        include: {
          model: Renter
        }
      });
    } catch (err) {
      throw err;
    }
  }

  async getOne(searchConditions: any): Promise<Contract | null> {
    try {
      return await Contract.findOne({
        where: searchConditions,
        include: {
          model: Renter,
        }
      });
    } catch (err) {
      throw err;
    }
  }

  async updateById(id: number, data: any): Promise<Contract> {
    try {
      await Contract.update(data, {
        where: {
          id: id,
        },
      });
      return (await this.getById(id))!;
    } catch (err) {
      throw err;
    }
  }
}
