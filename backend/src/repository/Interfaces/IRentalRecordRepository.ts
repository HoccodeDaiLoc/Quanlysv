import { RentalRecord } from "../../models/RentalRecord";
import { Renter } from "../../models/Renter";
import { BaseInterface } from "./BaseInterface";

export interface IRentalRecordRepository extends BaseInterface {
  getRental(searchCondition: any): Promise<RentalRecord | null>;
  createRentalRecord(
    checkInDate: Date | undefined,
    checkOutDate: Date | undefined,
    roomId: number | undefined,
    renterId: number | undefined
  ): Promise<RentalRecord>;
  deleteRentalById(id: number): Promise<boolean>;
  updateRentalRecordByRoomId(id: number, newData: any): Promise<RentalRecord>;
  updateRentalRecordByRenterId(id: number, newData: any): Promise<RentalRecord>;
  checkRenterExistInRoom(renterId: number, roomId: number,startDate: Date): Promise<boolean>;
}
