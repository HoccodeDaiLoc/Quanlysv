import { DeviceImage } from "../../models/DeviceImage";
import { BaseInterface } from "./BaseInterface";

export interface IDeviceImageRepository extends BaseInterface {
    createDeviceImage(deviceId: number, imageId: number): Promise<DeviceImage>;
}