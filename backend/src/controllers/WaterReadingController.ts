import { IWaterService } from "../service/Interfaces/IWaterService";
import { WaterService } from "../service/WaterService";
import { Request, Response, NextFunction } from "express";
import Container from "typedi";

export class WaterReadingController {
  private waterService: IWaterService;

  constructor() {
    this.waterService = Container.get(WaterService);
  }

  addWaterReading = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { waterNumber, waterRecordDate } = req.body;
      const roomId = +req.params.roomId as number;
      await this.waterService.addWaterReading(
        waterNumber,
        new Date(waterRecordDate),
        roomId
      );
      return res.status(201).json({
        message: "Water reading added successfully",
      });
    } catch (err) {
      next(err);
    }
  };

  getWaterReadingById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const waterReading = await this.waterService.getWaterReadingById(
        Number(id)
      );
      return res.status(200).json({
        message: "success",
        waterReading,
      });
    } catch (err) {
      next(err);
    }
  };

  getWaterReadingByRoomIdAndDate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { roomId } = req.params;
      const dateString = req.query as unknown as string;
      const date = new Date(dateString);
      let waterReading;
      if (!date) {
        waterReading = await this.waterService.getWaterReadingByRoomIdAndDate(
          Number(roomId),
          date
        );
      } else {
        waterReading = await this.waterService.getLastestWaterReading(
          Number(roomId)
        );
      }
      return res.status(200).json({
        message: "success",
        waterReading,
      });
    } catch (err) {
      next(err);
    }
  };
}
