import { Table, Column, DataType, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Bill } from "./Bill";


@Table({
    tableName: BillItem.BILLITEM_TABLE_NAME
})
export class BillItem extends Model {
    private static BILLITEM_TABLE_NAME = "billitems" as string;
    private static BILLITEM_ID = "id" as string;
    private static BILLITEM_NAME = "name" as string;
    private static BILLITEM_QUANTITY = "quantity" as string;
    private static BILLITEM_UNIT_PRICE = "unit_price" as string;
    private static BILLITEM_TOTAL_AMOUT = "total_amout" as string;

    @Column({
        type: DataType.INTEGER,
        field: BillItem.BILLITEM_ID,
        autoIncrement: true,
        primaryKey: true
    })
    id!: number;

    @Column({
        type: DataType.TEXT,
        field: BillItem.BILLITEM_NAME
    })
    itemName!: number;

    @Column({
        type: DataType.DOUBLE,
        field: BillItem.BILLITEM_QUANTITY
    })
    quantity!: number;

    @Column({
        type: DataType.DOUBLE,
        field: BillItem.BILLITEM_UNIT_PRICE
    })
    unitPrice!: number;

    @Column({
        type: DataType.DOUBLE,
        field: BillItem.BILLITEM_TOTAL_AMOUT
    })
    totalAmont!: number;

    @ForeignKey(() => Bill)
    @Column({
        type: DataType.INTEGER,
        field: "bill_id"
    })
    billId!: number;

    @BelongsTo(() => Bill)
    bill!: Bill;
}