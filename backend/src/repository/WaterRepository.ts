import { Service } from "typedi";
import { WaterMeterReading } from "../models/WaterMeterReading";
import { BaseRepository } from "./BaseRepository";
import { IWaterRepository } from "./Interfaces/IWaterRepository";

@Service()
export class WaterRepository
  extends BaseRepository<WaterMeterReading>
  implements IWaterRepository
{
  constructor() {
    super(WaterMeterReading);
  }

  async createWaterReading(
    waterNumber: number,
    date: Date,
    roomId: number
  ): Promise<WaterMeterReading> {
    try {
        const waterReading = await this.model.create({
            waterNumber: waterNumber,
            waterRecordDate: date,
            roomId: roomId
        });
        return waterReading;
    } catch (err) {
      throw err;
    }
  }

  async getWaterReadingById(id: number): Promise<WaterMeterReading | null> {
    try {
      const waterReading = await this.model.findByPk(id);
      return waterReading;
    }catch(err) {
      throw err;
    }
  }

  async getWaterReadingByRoomIdAndDate(roomId: number, date: Date): Promise<WaterMeterReading | null> {
    try {
      const waterReading = await this.model.findOne({
        where: {
          roomId: roomId,
          date: date
        }
      });
      return waterReading;
    } catch(err) {
      throw err;
    }
  }

  async getLastestWaterReading(roomId: number): Promise<WaterMeterReading | null> {
    try {
      const waterReading = await this.model.findOne({
        where: {
          roomId: roomId
        },
        order: [["waterRecordDate", "DESC"]]
      });
      return waterReading;
    }catch(err) {
      throw err;
    }
  }

  async getLastWaterReading(roomId: number): Promise<WaterMeterReading | null> {
    try {
      const waterReading = await this.model.findAll({
        limit: 2,
        where: {
          roomId: roomId
        },
        order: [["waterRecordDate", "DESC"]]
      });
      return waterReading[1];
    }catch(err) {
      throw err;
    }
  }
}
