import { NotificationSubject } from "../../models/NotificationSubject";
import { BaseInterface } from "./BaseInterface";

export interface INotificationSubjectRepository extends BaseInterface{
    createNotificationSubject(userId: number, notificationId: number): Promise<void>;
    getNotificationSubject(searchCondidate: any): Promise<NotificationSubject>;
    updateNotificationSubject(userId: number, notificationId: number): Promise<void>;
}