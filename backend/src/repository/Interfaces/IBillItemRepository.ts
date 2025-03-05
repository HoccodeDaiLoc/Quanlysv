import { BillItem } from "../../models/BillItem";
import { BaseInterface } from "./BaseInterface";

export interface IBillItemRepository extends BaseInterface {
    createBillItem(
        itemName: string,
        quantity: number,
        unitPrice: number,
        totalAmont: number,
        billId: number
    ): Promise<BillItem>;
}