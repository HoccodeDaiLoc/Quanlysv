import { ElectricReadingService } from "../service/ElectricReadingService";
import { IElectricReadingService } from "../service/Interfaces/IElectricReadingService";
import { Request, Response, NextFunction } from "express";
import Container from "typedi";

export class ElectricReadingController {
  private electricReadingService: IElectricReadingService;

  constructor() {
    this.electricReadingService = Container.get(ElectricReadingService);
  }

  addElectricReading = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { electricNumber, electricRecordDate } = req.body;
      const roomId = +req.params.roomId as number;
      await this.electricReadingService.addElectricReading(
        electricNumber,
        new Date(electricRecordDate),
        roomId
      );
      return res.status(201).json({
        message: "Electric reading added successfully",
      });
    } catch (err) {
      next(err);
    }
  };

  getElectricReadingById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const electricReading = await this.electricReadingService.getElectricReadingById(
        Number(id)
      );
      return res.status(200).json({
        message: "success",
        electricReading,
      });
    } catch (err) {
      next(err);
    }
  };

  getElectricReadingByRoomIdAndDate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { roomId } = req.params;
      const dateString = req.query as unknown as string;
      const date = new Date(dateString);
      let electricReading;
      if (!date) {
        electricReading = await this.electricReadingService.getElectricReadingByRoomIdAndDate(
          Number(roomId),
          date
        );
      } else {
        electricReading = await this.electricReadingService.getLastestElectricReading(
          Number(roomId)
        );
      }
      return res.status(200).json({
        message: "success",
        electricReading,
      });
    } catch (err) {
      next(err);
    }
  };
}
