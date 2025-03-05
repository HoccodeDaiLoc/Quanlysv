import { Service } from "typedi";
import { NotificationSubject } from "../models/NotificationSubject";
import { BaseRepository } from "./BaseRepository";
import { INotificationSubjectRepository } from "./Interfaces/INotificationSubjectRepository";
import { where } from "sequelize";

@Service()
export class NotificationSubjectRepository
  extends BaseRepository<NotificationSubject>
  implements INotificationSubjectRepository
{
  async createNotificationSubject(
    userId: number,
    notificationId: number
  ): Promise<void> {
    try {
      await NotificationSubject.create({
        userId,
        notificationId,
      });
    } catch (err) {
      throw err;
    }
  }

  async getNotificationSubject(searchCondidate: any) {
    try {
      const notificationSubject = await NotificationSubject.findOne(
        {
          where: searchCondidate
        }
      )
      return notificationSubject!;
    }catch(err) {
      throw err;
    }
  }

  async updateNotificationSubject(userId: number, notificationId: number) {
    try {
      await NotificationSubject.update(
        { isRead: true },
        {
          where: {
            userId,
            notificationId,
          },
        }
      );
    } catch (err) {
      throw err;
    }
  }
}
