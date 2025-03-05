import Container from "typedi";
import { INotificationService } from "../service/Interfaces/INotificationService";
import { NotificationService } from "../service/NotificationService";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export class NotificationController {
  private notificationService!: INotificationService;

  constructor() {
    this.notificationService = Container.get(NotificationService);
  }

  getListNotificationByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let limit = Number(req.query["limit"]) as number;
      let page = Number(req.query["page"]) as number;
      if (!page) {
        page = 0;
      }
      if (!limit) {
        limit = 12;
      }
      const userId = +req.params.userId as number;
      const listNotification =
        await this.notificationService.getNotificationByUserId(
          userId,
          limit,
          page
        );
      if (listNotification?.length === 0) {
        return next(new AppError("Notification not found", 404));
      }
      return res.status(200).json({
        message: "success",
        data: listNotification,
      });
    } catch (err) {
      next(err);
    }
  };

  updateNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notificationId = +req.params.notificationId as number;
      const data = req.body;
      const notification = await this.notificationService.updateNotification(
        notificationId,
        data
      );
      return res.status(200).json({
        message: "success",
        data: notification,
      });
    }catch(err) {
      next(err);
    }
  }

  changeRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notificationId = +req.params.notificationId as number;
      const userId = +req.body.userId as number;
      const notification = await this.notificationService.changeRead(userId, notificationId);
      return res.status(200).json({
        message: "success",
        data: notification,
      });
    }catch(err) {
      next(err);
    }
  }
}
