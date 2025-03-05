import { Bill } from "../../models/Bill";
import { Notification } from "../../models/Notification";

export interface IBillService {
  createBill(
    billStartDate: Date,
    billEndDate: Date,
    payMethod: string,
    billStatus: string,
    billItem: any[],
    roomId: number
  ): Promise<{bill: Bill, notification: Notification}>;
  getBill(searchCondidate: any): Promise<Bill>;
  getListBill(searchCondidate: any, limit: number, page: number): Promise<{rows: Bill[], count: number}>;
  getBillByRenter(renterId: number, status: string, limit: number, page: number): Promise<{rows: Bill[], count: number}>;
  getBillByRoom(roomId: number, status: string, limit: number, page: number): Promise<{rows: Bill[], count: number}>;
  updateBillById(billId: number, data: any): Promise<Bill>;
  deleteBillById(billId: number): Promise<boolean>;
  sendMail(billId: number): Promise<void>;
}
