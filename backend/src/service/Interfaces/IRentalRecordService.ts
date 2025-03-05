import { RentalRecord } from "../../models/RentalRecord";

export interface IRentalRecordService {
  createRentalRecord(
    checkInDate: Date,
    checkOutDate: Date | undefined,
    roomId: number,
    renterId: number
  ): Promise<RentalRecord>;
  updateRentalRecordByRoomId(
    roomId: number,
    rentalRecord: RentalRecord
  ): Promise<RentalRecord>;
  updateRentalRecordByRenterId(
    renterId: number,
    data: any
  ): Promise<RentalRecord>;
  deleteRentalRecord(id: number): Promise<boolean>;
  checkRenterExistInRoom(renterId: number, roomId: number, newStartDate: Date): Promise<boolean>;
}
