import { Column, DataType, HasMany, Model, Table, HasOne} from "sequelize-typescript";
import { ElectricityMeterReading } from "./ElectricityMeterReading";
import { WaterMeterReading } from "./WaterMeterReading";
import { RoomImage } from "./RoomImage";
import { Device } from "./Device";
import { RentalRecord } from "./RentalRecord";
import { Contract } from "./Contract";
import { Bill } from "./Bill";

@Table({
    tableName: Room.ROOM_TABLE_NAME
})
export class Room extends Model {
    private static ROOM_TABLE_NAME = "rooms" as string;
    private static ROOM_ID = "room_id" as string;
    private static ROOM_NUMBER = "room_number" as string;
    private static ROOM_DESCRIPTION = "description" as string
    private static ROOM_PRICE = "price" as string;
    private static ROOM_STATUS = "status" as string;
    private static ROOM_AREA = "area" as string;
    private static ROOM_MAX_OCCUPANCY = "max_occupancy" as string;

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: Room.ROOM_ID,
    })
    roomId!: number;

    @Column({
        type: DataType.INTEGER,
        field: Room.ROOM_NUMBER,
        unique: true
    })
    roomNumber!: number;

    @Column({
        type: DataType.TEXT,
        field: Room.ROOM_DESCRIPTION
    })
    description!: string;

    @Column({
        type: DataType.DOUBLE,
        field: Room.ROOM_PRICE
    })
    price!: number;

    @Column({
        type: DataType.ENUM('Đang cho thuê', 'Phòng trống'),
        defaultValue: "Phòng trống",
        field: Room.ROOM_STATUS
    })
    roomStatus!: string;

    @Column({
        type: DataType.DOUBLE,
        field: Room.ROOM_AREA
    })
    roomArea!: number;

    @Column({
        type: DataType.INTEGER,
        field: Room.ROOM_MAX_OCCUPANCY
    })
    maxOccupancy!: number;

    @HasMany(() => ElectricityMeterReading)
    electric!: ElectricityMeterReading[];

    @HasMany(() => WaterMeterReading)
    water!: WaterMeterReading[];

    @HasMany(() => RoomImage)
    roomImage!: RoomImage[];

    @HasMany(() => Device)
    device!: Device[];

    @HasMany(() => RentalRecord)
    renterRecord!: RentalRecord[];

    @HasOne(() => Contract)
    contract!: Contract;

    @HasOne(() => Bill)
    bill!: Bill;
}