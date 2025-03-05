import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { Notification } from "./Notification";

@Table({
    tableName: NotificationSubject.NOTIFICATIONSUBJECT_TABLE_NAME
})
export class NotificationSubject extends Model {
    private static NOTIFICATIONSUBJECT_TABLE_NAME = "notificationsubject" as string;
    private static NOTIFICATIONSUBJECT_ID = "subject_id" as string;
    private static NOTIFICATIONSUBJECT_USER_ID = "user_id" as string;
    private static NOTIFICATIONSUBJECT_ISREAD = "is_read" as string;

    @Column({
        type: DataType.INTEGER,
        field: NotificationSubject.NOTIFICATIONSUBJECT_ID,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.INTEGER,
        field: NotificationSubject.NOTIFICATIONSUBJECT_USER_ID,
    })
    userId!: number;

    @Column({
        type: DataType.BOOLEAN,
        field: NotificationSubject.NOTIFICATIONSUBJECT_ISREAD,
    })
    isRead!: boolean;

    @ForeignKey(() => Notification)
    @Column({
        type: DataType.INTEGER,
        field: "notification_id"
    })
    notificationId!: number;

    @BelongsTo(() => Notification)
    notification!: Notification;
}