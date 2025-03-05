import { ElectricityMeterReading } from "../../models/ElectricityMeterReading";

export interface IElectricReadingService {
    addElectricReading(electricNumber: number, date: Date, roomId: number): Promise<void>;
    getElectricReadingById(id: number): Promise<ElectricityMeterReading>;
    getElectricReadingByRoomIdAndDate(roomId: number, date: Date): Promise<ElectricityMeterReading>;
    getLastestElectricReading(roomId: number): Promise<ElectricityMeterReading>;
}