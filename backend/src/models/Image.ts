import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { RoomImage } from "./RoomImage";
import { DeviceImage } from "./DeviceImage";

@Table({
    tableName: Image.IMAGE_TABLE_NAME
})
export class Image extends Model {
    private static IMAGE_TABLE_NAME = "images" as string;
    private static IMAGE_ID = "image_id" as string;
    private static IMAGE_URL = "image_url" as string;

    @Column({
        type: DataType.INTEGER,
        field: Image.IMAGE_ID,
        primaryKey: true,
        autoIncrement: true
    })
    imageID!: number;

    @Column({
        type: DataType.TEXT,
        field: Image.IMAGE_URL
    })
    imageUrl!: string;

    @HasOne(() => DeviceImage)
    deviceImageId!: DeviceImage;

    @HasOne(() => RoomImage)
    roomImageId!: RoomImage;
}