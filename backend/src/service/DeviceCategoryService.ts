import { Inject, Service } from "typedi";
import { DeviceCategory } from "../models/DeviceCategory";
import { IDeviceCategoryService } from "./Interfaces/IDeviceCategoryService";
import { DeviceCategoryRepository } from "../repository/DeviceCategoryRepository";

@Service()
export class DeviceCategoryService implements IDeviceCategoryService {
    @Inject(() => DeviceCategoryRepository)
    deviceCategoryRepository!: IDeviceCategoryService;

    async getAllCategory(): Promise<DeviceCategory[]> {
        try {
            const allCategory = await this.deviceCategoryRepository.getAllCategory();
            return allCategory;
        }catch(err){
            throw err;
        }
    }

    async getCategoryOfDevice(id: number[]): Promise<DeviceCategory | null> {
        try {
            const category = await this.deviceCategoryRepository.getCategoryOfDevice(id);
            return category;
        }catch(err) {
            throw err;
        }
    }
}