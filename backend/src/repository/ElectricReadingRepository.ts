import { Service } from "typedi";
import { ElectricityMeterReading } from "../models/ElectricityMeterReading";
import { BaseRepository } from "./BaseRepository";
import { IElectricReadingRepository } from "./Interfaces/IElectricReadingRepository";

@Service()
export class ElectricReadingRepository
  extends BaseRepository<ElectricityMeterReading>
  implements IElectricReadingRepository
{
  async createElectricReading(
    electricNumber: number,
    date: Date,
    roomId: number
  ): Promise<ElectricityMeterReading> {
    try {
      const electricReading = await ElectricityMeterReading.create({
        electricNumber: electricNumber,
        electricRecordDate: date,
        roomId: roomId,
      });
      return electricReading;
    } catch (err) {
      throw err;
    }
  }

  async getElectricReadingById(id: number): Promise<ElectricityMeterReading | null> {
    try {
      const electricReading = await ElectricityMeterReading.findByPk(id);
      return electricReading;
    } catch (err) {
      throw err;
    }
  }

  async getElectricReadingByRoomIdAndDate(id: number, date: Date): Promise<ElectricityMeterReading | null> {
    try {
      const electricReading = await ElectricityMeterReading.findOne({
        where: {
          roomId: id,
          date: date,
        },
      });
      return electricReading;
    } catch (err) {
      throw err;
    }
  }

  async getLatestElectricReading(roomId: number): Promise<ElectricityMeterReading | null> {
    try {
      const electricReading = await ElectricityMeterReading.findOne({
        where: {
          roomId: roomId,
        },
        order: [["electricRecordDate", "DESC"]],
      });
      return electricReading;
    } catch (err) {
      throw err;
    }
  }

  async getLastElectricReading(roomId: number): Promise<ElectricityMeterReading | null> {
    try {
      const electricReading = await ElectricityMeterReading.findAll({
        limit: 2,
        where: {
          roomId: roomId,
        },
        order: [["electricRecordDate", "DESC"]],
      });
      return electricReading[1];
    } catch (err) {
      throw err;
    }
  }
}
