import { Service } from "typedi";
import { BillItem } from "../models/BillItem";
import { BaseRepository } from "./BaseRepository";
import { IBillItemRepository } from "./Interfaces/IBillItemRepository";

@Service()
export class BillItemRepository
  extends BaseRepository<BillItem>
  implements IBillItemRepository
{
  async createBillItem(
    itemName: string,
    quantity: number,
    unitPrice: number,
    totalAmont: number,
    billId: number
  ): Promise<BillItem> {
    try {
      const billItem = await BillItem.create({
        itemName,
        quantity,
        unitPrice,
        totalAmont,
        billId,
      });
      return billItem;
    } catch (err) {
      throw err;
    }
  }
}
