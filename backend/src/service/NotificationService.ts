import { Inject, Service } from "typedi";
import { INotificationService } from "./Interfaces/INotificationService";
import { INotificationRepository } from "../repository/Interfaces/INotificationRepository";
import { NotificationRepository } from "../repository/NotificationRepository";
import { Notification } from "../models/Notification";
import { AppError } from "../errors/AppError";
import { NotificationSubject } from "../models/NotificationSubject";
import { NotificationSubjectRepository } from "../repository/NotificationSubjectRepository";
import { INotificationSubjectRepository } from "../repository/Interfaces/INotificationSubjectRepository";

@Service()
export class NotificationService implements INotificationService {
  @Inject(() => NotificationRepository)
  private notificationRepository!: INotificationRepository;

  @Inject(() => NotificationSubjectRepository)
  private notificationSubjectRepository!: INotificationSubjectRepository;

  async getListNotification(
    searchCondidate: any,
    limit: number,
    page: number
  ): Promise<Notification[]> {
    try {
      const notifications =
        await this.notificationRepository.getListNotification(
          searchCondidate,
          limit,
          page
        );
      if (notifications === null) {
        throw new AppError("Notification not found", 404);
      }
      return notifications;
    } catch (err) {
      throw err;
    }
  }

  async getNotification(searchCondidate: any): Promise<Notification> {
    try {
      const notification = await this.notificationRepository.getNotification(
        searchCondidate
      );
      if (notification === null) {
        throw new AppError("Notification not found", 404);
      }
      return notification;
    } catch (err) {
      throw err;
    }
  }

  async createNotification(
    title: string,
    content: string,
    dateCreated: Date,
    subjects: number[],
  ): Promise<Notification> {
    try {
      const notification = await this.notificationRepository.createNotification(
        title,
        content,
        dateCreated,
      );
      const subjectsObject = await Promise.all(
        subjects.map(async (userId) => {
          return await this.notificationSubjectRepository.createNotificationSubject(
            userId,
            notification!.notificationId
          );
        })
      );
      const newNotification = await this.notificationRepository.getNotification(
        { notificationId: notification!.notificationId }
      );
      return newNotification!;
    } catch (err) {
      throw err;
    }
  }

  async getNotificationByUserId(
    userId: number,
    limit: number,
    offset: number
  ): Promise<Notification[]> {
    try {
      const notifications =
        await this.notificationRepository.getNotificationByUserId(
          userId,
          limit,
          offset
        );
      if (notifications === null) {
        throw new AppError("Notification not found", 404);
      }
      return notifications;
    } catch (err) {
      throw err;
    }
  }

  async updateNotification(searchCondidate: any, data: any): Promise<Notification> {
    try {
      const noti = await this.notificationRepository.getNotification(searchCondidate);
      if (noti === null) {
        throw new AppError("Notification not found", 404);
      }
      const notification = await this.notificationRepository.updateNotification(data, searchCondidate);
      return notification;
    }catch(err) {
      throw err;
    }
  }

  async changeRead(userId: number, notificationId: number): Promise<Notification> {
    try {
      const subject = await this.notificationSubjectRepository.getNotificationSubject({ userId, notificationId });
      if(subject === null) {
        throw new AppError("NotificationSubject not found", 404);
      }
      const subjectsNoti = await this.notificationSubjectRepository.updateNotificationSubject(userId, notificationId);
      const notification = await this.notificationRepository.getNotification({ notificationId });
      return notification!;
    }catch(err) {
      throw err;
    }
  }
}
