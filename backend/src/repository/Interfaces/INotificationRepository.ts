import { BaseInterface } from "./BaseInterface";
import { Notification } from "../../models/Notification";

export interface INotificationRepository extends BaseInterface {
  getListNotification(
    searchCondidate: any,
    limit: number,
    offset: number
  ): Promise<Notification[] | null>;
  getNotification(searchCondidate: any): Promise<Notification | null>;
  createNotification(
    title: string,
    content: string,
    dateCreated: Date,
  ): Promise<Notification | null>;
  getNotificationByUserId(
    userId: number,
    limit: number,
    offset: number
  ): Promise<Notification[] | null>;
  updateNotification(id: number, data: any): Promise<Notification>;
}
