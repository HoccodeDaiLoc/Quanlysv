import { Table, Column, DataType, Model, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Room } from "./Room";
import { BillItem } from "./BillItem";


@Table({
    tableName: Bill.BILL_TABLE_NAME
})
export class Bill extends Model {
    private static BILL_TABLE_NAME = "bill" as string;
    private static BILL_ID = "bill_id" as string;
    private static BILL_START_DATE = "bill_start_date" as string;
    private static BILL_END_DATE = "bill_end_date" as string;
    private static BILL_TOTAL = "total" as string;
    private static BILL_PAYMENT_METHOD = "payment_method" as string;
    private static BILL_STATUS = "status" as string;

    @Column({
        type: DataType.INTEGER,
        field: Bill.BILL_ID,
        autoIncrement: true,
        primaryKey: true
    })
    billId!: number;

    @Column({
        type: DataType.DATE,
        field: Bill.BILL_START_DATE
    })
    billStartDate!: Date;

    @Column({
        type: DataType.DATE,
        field: Bill.BILL_END_DATE
    })
    billEndDate!: Date;

    @Column({
        type: DataType.DOUBLE,
        field: Bill.BILL_TOTAL
    })
    total!: number;

    @Column({
        type: DataType.ENUM("tiền mặt", "chuyển khoản"),
        field: Bill.BILL_PAYMENT_METHOD
    })
    paymentMethod!: string;

    @Column({
        type: DataType.ENUM("đã thanh toán", "chưa thanh toán"),
        field: Bill.BILL_STATUS
    })
    status!: string;

    @ForeignKey(() => Room)
    @Column({
        type: DataType.INTEGER,
        field: "room_id"
    })
    roomId!: number;

    @HasMany(() => BillItem)
    billItem!: BillItem;
}