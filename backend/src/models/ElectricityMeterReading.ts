import { Table, Column, DataType, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Room } from "./Room";


@Table({
    tableName: ElectricityMeterReading.ELECTRIC_TABLE_NAME
})
export class ElectricityMeterReading extends Model {
    private static ELECTRIC_TABLE_NAME = "electricitymeterreadings" as string;
    private static ELECTRIC_ID = "electric_id" as string;
    private static ELECTRIC_NUMBER = "electric_number" as string;
    private static ELECTRIC_RECORD_DATE = "electric_record_date" as string;

    @Column({
        type: DataType.INTEGER,
        field: ElectricityMeterReading.ELECTRIC_ID,
        autoIncrement: true,
        primaryKey: true
    })
    electricId!: number;

    @Column({
        type: DataType.DOUBLE,
        field: ElectricityMeterReading.ELECTRIC_NUMBER
    })
    electricNumber!: number;

    @Column({
        type: DataType.DATE,
        field: ElectricityMeterReading.ELECTRIC_RECORD_DATE
    })
    electricRecordDate!: number

    @ForeignKey(() => Room)
    @Column({
        type: DataType.INTEGER,
        field: "room_id"
    })
    roomId!: number;

    @BelongsTo(() => Room)
    room!: Room
}