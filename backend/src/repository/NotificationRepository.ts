import { Service } from "typedi";
import { Notification } from "../models/Notification";
import { NotificationSubject } from "../models/NotificationSubject";
import { BaseRepository } from "./BaseRepository";
import { INotificationRepository } from "./Interfaces/INotificationRepository";

@Service()
export class NotificationRepository
  extends BaseRepository<Notification>
  implements INotificationRepository
{
  async getListNotification(
    searchCondidate: any,
    limit: number,
    offset: number
  ): Promise<Notification[] | null> {
    try {
      const notifications = await Notification.findAll({
        limit: limit,
        offset,
        where: searchCondidate,
        include: {
          model: NotificationSubject,
          attributes: {
            include: ["user_id"],
          },
        },
      });
      return notifications;
    } catch (err) {
      throw err;
    }
  }

  async getNotification(searchCondidate: any): Promise<Notification | null> {
    try {
      const notification = await Notification.findOne({
        where: searchCondidate,
        include: {
          model: NotificationSubject,
        },
      });
      return notification;
    } catch (err) {
      throw err;
    }
  }

  async createNotification(
    title: string,
    content: string,
    dateCreated: Date,
  ): Promise<Notification | null> {
    try {
      const notification = await Notification.create({
        title,
        content,
        dateCreated,
      });
      return notification;
    } catch (err) {
      throw err;
    }
  }

  async updateNotification(
    data: any,
    searchCondidate: any
  ): Promise<Notification> {
    try {
      await Notification.update(data, {
        where: searchCondidate,
      });
      const notification = await Notification.findOne({
        where: searchCondidate,
      });
      return notification!;
    } catch (err) {
      throw err;
    }
  }

  async getNotificationByUserId(
    userId: number,
    limit: number,
    offset: number
  ): Promise<Notification[] | null> {
    try {
      const notifications = await Notification.findAll({
        limit: limit,
        offset,
        include: {
          model: NotificationSubject,
          where: {
            userId: userId,
          },
        },
      });
      return notifications;
    } catch (err) {
      throw err;
    }
  }
}
