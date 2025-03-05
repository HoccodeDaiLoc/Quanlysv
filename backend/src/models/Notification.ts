import { Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { NotificationSubject } from "./NotificationSubject";

@Table({
    tableName: Notification.NOTIFICATION_TABLE_NAME
})
export class Notification extends Model {
    private static NOTIFICATION_TABLE_NAME = "notification" as string;
    private static NOTIFICATION_ID = "notification_id" as string;
    private static NOTIFICATION_TITLE  = "title" as string;
    private static NOTIFICATION_CONTENT = "content" as string;
    private static NOTIFICATION_DATE_CREATED = "date_created" as string;

    @Column({
        type: DataType.INTEGER,
        field: Notification.NOTIFICATION_ID,
        primaryKey: true,
        autoIncrement: true
    })
    notificationId!: number;

    @Column({
        type: DataType.TEXT,
        field: Notification.NOTIFICATION_TITLE
    })
    title!: string;

    @Column({
        type: DataType.TEXT,
        field: Notification.NOTIFICATION_CONTENT
    })
    content!: string;

    @Column({
        type: DataType.DATE,
        field: Notification.NOTIFICATION_DATE_CREATED
    })
    dateCreated!: Date;

    @HasMany(() => NotificationSubject)
    notificationSubjects!: NotificationSubject[];
}