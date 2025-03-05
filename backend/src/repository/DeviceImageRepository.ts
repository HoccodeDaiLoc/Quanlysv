import { Service } from "typedi";
import { DeviceImage } from "../models/DeviceImage";
import { BaseRepository } from "./BaseRepository";
import { IDeviceImageRepository } from "./Interfaces/IDeviceImageRepository";

@Service()
export class DeviceImageRepository extends BaseRepository<DeviceImage> implements IDeviceImageRepository {
    async createDeviceImage(deviceId: number, imageId: number): Promise<DeviceImage> {
        try {
            const deviceImage = await DeviceImage.create({
                deviceId: deviceId,
                imageId: imageId
            });
            return deviceImage;
        }catch(err) {
            throw err;
        }
    }
}