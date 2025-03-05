import Container from "typedi";
import { IDeviceCategoryService } from "../service/Interfaces/IDeviceCategoryService"
import { DeviceCategoryService } from "../service/DeviceCategoryService";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export class DeviceCategoryController {
    private deviceCategoryService!: IDeviceCategoryService;

    constructor() {
        this.deviceCategoryService = Container.get(DeviceCategoryService);
    }

    getAllCategory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const category = await this.deviceCategoryService.getAllCategory();
            if(category.length === 0) {
                return next(new AppError("Không thể tìm thấy category", 404));
            }
            return res.status(200).json({
                message: "success",
                category
            });
        }catch(err) {
            throw err;
        }
    }

    getCategoryOfDevice = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deviceId = [Number(req.query["device_id"]) as number];
            const category = await this.deviceCategoryService.getCategoryOfDevice(deviceId);
            return res.status(200).json({
                message: "success",
                category
            });
        }catch(err) {
            throw err;
        }
    }
}