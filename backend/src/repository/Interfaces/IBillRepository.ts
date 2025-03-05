import { Bill } from "../../models/Bill";
import { BillItem } from "../../models/BillItem";
import { BaseInterface } from "./BaseInterface";

export interface IBillRepository extends BaseInterface {
  createBill(
    billStartDate: Date,
    billEndDate: Date,
    total: number,
    payMethod: string,
    billStatus: string,
    roomId: number
  ): Promise<Bill>;
  getBill(searchCondidate: any): Promise<Bill | null>;
  updateBillByID(id: number, data: any): Promise<Bill>;
  getListBill(
    searchCondidate: any,
    limit: number,
    page: number
  ): Promise<{rows: Bill[], count: number} | null>;
  getBillAfterDate(
    date: Date,
    status: string | undefined,
    limit: number,
    page: number
  ): Promise<{rows: Bill[], count: number} | null>;
  getBillBeforeDate(
    date: Date,
    limit: number,
    page: number
  ): Promise<{rows: Bill[], count: number} | null>;
  getBillWithTimeFrame(
    startDate: Date,
    endDate: Date,
    status: string | undefined,
    limit: number,
    page: number,
    searchCondidate: any
  ): Promise<{rows: Bill[], count: number} | null>;
  getBillEndDateWithTimeFrame(
    startDate: Date,
    endDate: Date,
    status: string | undefined,
    limit: number,
    page: number,
    searchCondidate: any
  ): Promise<{rows: Bill[], count: number} | null>;
  deleteBillById(id: number): Promise<boolean>;
}
