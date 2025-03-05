import { Service } from "typedi";
import { Image } from "../models/Image";
import { BaseRepository } from "./BaseRepository";
import { IImageRepository } from "./Interfaces/IImageRepository";
import { RentalRecord } from "../models/RentalRecord";
import { IRentalRecordRepository } from "./Interfaces/IRentalRecordRepository";
import { Renter } from "../models/Renter";
import { Op } from "sequelize";

@Service()
export class RentalRecordRepository
  extends BaseRepository<RentalRecord>
  implements IRentalRecordRepository
{
  async getRental(searchCondition: any): Promise<RentalRecord | null> {
    try {
      const rental = await RentalRecord.findOne({
        where: searchCondition,
      });
      return rental;
    }catch(err) {
      throw err;
    }
  }

  async createRentalRecord(
    checkInDate: Date | undefined,
    checkOutDate: Date | undefined,
    roomId: number | undefined,
    renterId: number | undefined
  ): Promise<RentalRecord> {
    try {
      const newRental = await RentalRecord.create({
        renterId,
        checkInDate,
        checkOutDate,
        roomId,
      });
      return newRental;
    } catch (err) {
      throw err;
    }
  }

  async deleteRentalById(id: number): Promise<boolean> {
    try {
      const deletedRental = await RentalRecord.destroy({
        where: { id },
      });
      return deletedRental ? true : false;
    } catch (err) {
      throw err;
    }
  }

  async updateRentalRecordByRoomId(roomId: number, newData: any): Promise<RentalRecord> {
    try {
      const updatedRental = await RentalRecord.update(newData, {
        where: { roomId },
        returning: true,
      });
      return updatedRental[1][0];
    } catch (err) {
      throw err;
    }
  }

  async updateRentalRecordByRenterId(renterId: number, newData: any): Promise<RentalRecord> {
    try {
      const updatedRental = await RentalRecord.update(newData, {
        where: { renterId },
        returning: true,
      });
      return updatedRental[1][0];
    } catch (err) {
      throw err;
    }
  }

  async checkRenterExistInRoom(renterId: number, roomId: number,startDate: Date): Promise<boolean> {
    try {
      const rentalRecord = await RentalRecord.findOne({
        where: {
          roomId,
          renterId,
          checkInDate: {
            [Op.lte]: startDate,
          },
          checkOutDate: {
            [Op.gte]: startDate,
          }
        }
      });
      return !!rentalRecord;
    }catch(err) {
      throw err;
    }
  }
}
