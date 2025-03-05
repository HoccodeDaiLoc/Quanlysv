import { Device } from "../../models/Device";
import { DeviceCategory } from "../../models/DeviceCategory";

export interface IDeviceCategoryService {
  getAllCategory(): Promise<DeviceCategory[]>;
  getCategoryOfDevice(id: number[]): Promise<DeviceCategory | null>;
}