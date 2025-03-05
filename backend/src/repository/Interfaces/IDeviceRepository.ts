import { Device } from "../../models/Device";
import { DeviceCategory } from "../../models/DeviceCategory";
import { BaseInterface } from "./BaseInterface";

export interface IDeviceRepository extends BaseInterface {
  getAllDevice(limit: number, page: number): Promise<{rows: Device[], count: number}>;
  getDeviceById(id: number): Promise<Device | null>;
  deleteDeviceById(id: number): Promise<void>;
  createDevice(
    name: string,
    price: number,
    category_id: number | undefined,
    roomId: number | undefined
  ): Promise<Device>;
  updateDeviceById(id: number, newData: any): Promise<Device | null>;
}
