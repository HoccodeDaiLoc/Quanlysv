import { Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import { Device } from "./Device";

@Table({
    tableName: DeviceCategory.DEVICECATEGORY_TABLE_NAME
})
export class DeviceCategory extends Model {
    private static DEVICECATEGORY_TABLE_NAME = "devicecategorys" as string;
    private static DEVICECATEGORY_ID = "id" as string;
    private static DEVICECATEGORY_NAME = "category_name" as string;
    private static DEVICECATEGORY_IMAGE = "category_image" as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: DeviceCategory.DEVICECATEGORY_ID,
    })
    deviceCategoryId!: number;

    @Column({
        type: DataType.TEXT,
        field: DeviceCategory.DEVICECATEGORY_NAME
    })
    categoryName!: string;

    @Column({
        type: DataType.TEXT,
        field: DeviceCategory.DEVICECATEGORY_IMAGE
    })
    image!: string;

    @HasMany(() => Device)
    device!: Device[];
}