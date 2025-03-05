import { ElectricityMeterReading } from "../../models/ElectricityMeterReading";
import { BaseInterface } from "./BaseInterface";

export interface IElectricReadingRepository extends BaseInterface {
  createElectricReading(
    electricNumber: number,
    date: Date,
    roomId: number
  ): Promise<ElectricityMeterReading>;
  getElectricReadingById(id: number): Promise<ElectricityMeterReading | null>;
  getElectricReadingByRoomIdAndDate(
    roomId: number,
    date: Date
  ): Promise<ElectricityMeterReading | null>;
  getLatestElectricReading(
    roomId: number
  ): Promise<ElectricityMeterReading | null>;
  getLastElectricReading(roomId: number): Promise<ElectricityMeterReading | null>;
}
