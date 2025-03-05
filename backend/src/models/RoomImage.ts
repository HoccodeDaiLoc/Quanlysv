import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Room } from "./Room";
import { Image } from "./Image";

@Table({
    tableName: RoomImage.ROOMIMAGE_TABLE_NAME
})
export class RoomImage extends Model {
    private static ROOMIMAGE_TABLE_NAME = "roomimages" as string;
    private static ROOMIMAGE_ID = "roomImage_id" as string;

    @Column({
        type: DataType.INTEGER,
        field: RoomImage.ROOMIMAGE_ID,
        autoIncrement: true,
        primaryKey: true
    })
    roomImageId!: number;

    @ForeignKey(() => Room)
    @Column({
        type: DataType.INTEGER,
        field: "room_Id"
    })
    roomId!: number;

    @ForeignKey(() => Image)
    @Column({
        type: DataType.INTEGER,
        field: "image_Id"
    })
    imageId!: number;

    @BelongsTo(() => Room)
    room!: Room;

    @BelongsTo(() => Image)
    image!: Image;
}