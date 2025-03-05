import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Device } from "./Device";
import { Image } from "./Image";

@Table({
    tableName: DeviceImage.DEVICEIMAGE_TABLE_NAME
})
export class DeviceImage extends Model {
    private static DEVICEIMAGE_TABLE_NAME = "deviceimages" as string;
    private static DEVICEIMAGE_ID = "deviceImage_id" as string;
    
    @Column({
        type: DataType.INTEGER,
        field: DeviceImage.DEVICEIMAGE_ID,
        primaryKey: true,
        autoIncrement: true
    })
    deviceImageId!: number;

    @ForeignKey(() => Device)
    @Column({
        type: DataType.INTEGER,
        field: "deviceId"
    })
    deviceId!: number

    @ForeignKey(() => Image)
    @Column({
        type: DataType.INTEGER,
        field: "imageId"
    })
    imageId!: number;

    @BelongsTo(() => Image)
    image!: Image[];
}