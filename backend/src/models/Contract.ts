import { Table, Column, DataType, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Room } from "./Room";
import { Renter } from "./Renter";


@Table({
    tableName: Contract.CONTRACT_TABLE_NAME
})
export class Contract extends Model {
    private static CONTRACT_TABLE_NAME = "contracts" as string;
    private static CONTRACT_ID = "id" as string;
    private static CONTRACT_START_DAY = "start_day" as string;
    private static CONTRACT_END_DAY = "end_day" as string;
    private static CONTRACT_RENT_AMOUNT = "rent_amount" as string;
    private static CONTRACT_DEPOSIT_AMOUNT = "deposit_amount" as string;

    @Column({
        type: DataType.INTEGER,
        field: Contract.CONTRACT_ID,
        autoIncrement: true,
        primaryKey: true
    })
    contractId!: number;

    @Column({
        type: DataType.DATE,
        field: Contract.CONTRACT_START_DAY
    })
    startDay!: Date;

    @Column({
        type: DataType.DATE,
        field: Contract.CONTRACT_END_DAY
    })
    endDate!: Date;

    @Column({
        type: DataType.DOUBLE,
        field: Contract.CONTRACT_RENT_AMOUNT
    })
    rentAmount!: number;

    @Column({
        type: DataType.DOUBLE,
        field: Contract.CONTRACT_DEPOSIT_AMOUNT
    })
    depositAmount!: number;

    @ForeignKey(() => Room)
    @Column({
        type: DataType.INTEGER,
        field: "room_id"
    })
    roomId!: number;

    @ForeignKey(() => Renter)
    @Column({
        type: DataType.INTEGER,
        field: "renter_id"
    })
    renterId!: number;

    @BelongsTo(() => Room)
    room!: Room;

    @BelongsTo(() => Renter)
    renter!: Renter;
}