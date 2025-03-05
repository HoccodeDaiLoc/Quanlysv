import { Table, Column, DataType, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Room } from "./Room";


@Table({
    tableName: WaterMeterReading.WATER_TABLE_NAME
})
export class WaterMeterReading extends Model {
    private static WATER_TABLE_NAME = "watermeterreadings" as string;
    private static WATER_ID = "water_id" as string;
    private static WATER_NUMBER = "water_number" as string;
    private static WATER_RECORD_DATE = "water_record_date" as string;

    @Column({
        type: DataType.INTEGER,
        field: WaterMeterReading.WATER_ID,
        autoIncrement: true,
        primaryKey: true
    })
    waterId!: number;

    @Column({
        type: DataType.DOUBLE,
        field: WaterMeterReading.WATER_NUMBER
    })
    waterNumber!: number;

    @Column({
        type: DataType.DATE,
        field: WaterMeterReading.WATER_RECORD_DATE
    })
    waterRecordDate!: number;

    @ForeignKey(() => Room)
    @Column({
        type: DataType.INTEGER,
        field: "room_id"
    })
    roomId!: number;

    @BelongsTo(() => Room)
    room!: Room;
}