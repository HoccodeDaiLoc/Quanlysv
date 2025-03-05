import { Device } from "../../models/Device";
import { DeviceCategory } from "../../models/DeviceCategory";
import { BaseInterface } from "./BaseInterface";

export interface IDeviceCategoryRepository extends BaseInterface {
  getAllCategory(): Promise<DeviceCategory[]>;
  getCategoryOfDevice(id: number[]): Promise<DeviceCategory | null>;
}
