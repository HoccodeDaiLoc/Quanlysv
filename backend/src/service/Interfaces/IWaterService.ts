import { WaterMeterReading } from "../../models/WaterMeterReading";

export interface IWaterService {
    addWaterReading(waterNumber: number, date: Date, roomId: number): Promise<void>;
    getWaterReadingById(id: number): Promise<WaterMeterReading>;
    getWaterReadingByRoomIdAndDate(roomId: number, date: Date): Promise<WaterMeterReading>;
    getLastestWaterReading(roomId: number): Promise<WaterMeterReading>;
}