import Container from "typedi";
import { IDeviceService } from "../service/Interfaces/IDeviceService";
import { DeviceService } from "../service/DeviceService";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export class DeviceController {
  private deviceService: IDeviceService;

  constructor() {
    this.deviceService = Container.get(DeviceService);
  }

  getAllDevice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let limit = Number(req.query["limit"]) as number;
      let page = Number(req.query["page"]) as number;
      if (!page) {
        page = 1;
      }
      if (!limit) {
        limit = 12;
      }
      const allDevice = await this.deviceService.getAllDevice(limit, page);
      if (allDevice.rows.length === 0) {
        return next(new AppError("Không thể tìm thấy thiết bị", 404));
      }
      const total = allDevice.count;
      const total_pages = Math.ceil(total / limit);
      return res.status(200).json({
        page,
        limit,
        total,
        total_pages,
        message: "Success",
        data: allDevice.rows,
      });
    } catch (err) {
      next(err);
    }
  };

  getDeviceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params["deviceId"]) as number;
      const device = await this.deviceService.getDeviceById(id);
      if (!device) {
        return next(new AppError("Không thể tìm thấy thiết bị", 404));
      }
      return res.status(201).json({
        message: "success",
        device
      })
    } catch (err) {
      next(err);
    }
  };

  deleteDeviceById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(req.params["deviceId"]) as number;
      await this.deviceService.deleteDeviceById(id);
      return res.status(200).json({
        message: "Delete device successfully",
      });
    } catch (err) {
      next(err);
    }
  };

  addDevice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deviceName = req.body["deviceName"] as string;
      const devicePrice = req.body["devicePrice"] as number;
      const roomId = req.body["roomId"] as number | undefined;
      const deviceImage = req.body["deviceImage"] as string[] | undefined;
      const categoryId = req.body["categoryId"] as number | undefined;
      await this.deviceService.addDevice(
        deviceName,
        devicePrice,
        categoryId,
        deviceImage,
        roomId
      );
      return res.status(201).json({
        message: "add device successfuly",
      });
    } catch (err) {
      next(err);
    }
  };

  updateDeviceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params["deviceId"]) as number;
      const newData = req.body;
      const device = await this.deviceService.updateDevice(id, newData);
      if (!device) {
        return next(new AppError("Không thể cập nhật thiết bị", 404));
      }
      return res.status(200).json({
        message: "Update device successfully",
        device,
      });
    } catch (err) {
      next(err);
    }
  }

  addDeviceForRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
    }catch(err) {
      next(err);
    }
  }
}
