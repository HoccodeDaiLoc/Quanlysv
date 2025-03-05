import { Service } from "typedi";
import { DeviceImage } from "../models/DeviceImage";
import { BaseRepository } from "./BaseRepository";
import { IDeviceImageRepository } from "./Interfaces/IDeviceImageRepository";
import { IDeviceCategoryRepository } from "./Interfaces/IDeviceCategoryRepository";
import { DeviceCategory } from "../models/DeviceCategory";
import { Device } from "../models/Device";

@Service()
export class DeviceCategoryRepository extends BaseRepository<DeviceCategory> implements IDeviceCategoryRepository {
    async getAllCategory(): Promise<DeviceCategory[]> {
        try {
            const allCategory = await DeviceCategory.findAll({});
            return allCategory;
        }catch(err) {
            throw err;
        }
    }

    async getCategoryOfDevice(id: number[]): Promise<DeviceCategory | null> {
        try {
          const device = await Device.findOne({
            where: {
              devices_id: id,
            },
          });
          const category = await DeviceCategory.findOne({
            where: {
              id: device?.categoryId
            }
          });
          return category;
        } catch (err) {
          throw err;
        }
      }
}