import { Inject, Service } from "typedi";
import { IDeviceService } from "./Interfaces/IDeviceService";
import { Device } from "../models/Device";
import { DeviceRepository } from "../repository/DeviceRepository";
import { IDeviceRepository } from "../repository/Interfaces/IDeviceRepository";
import { ImageRepository } from "../repository/ImageRepository";
import { IImageRepository } from "../repository/Interfaces/IImageRepository";
import { DeviceImageRepository } from "../repository/DeviceImageRepository";
import { IDeviceImageRepository } from "../repository/Interfaces/IDeviceImageRepository";
import { DeviceCategory } from "../models/DeviceCategory";
import { DeviceCategoryRepository } from "../repository/DeviceCategoryRepository";
import { IDeviceCategoryRepository } from "../repository/Interfaces/IDeviceCategoryRepository";

@Service()
export class DeviceService implements IDeviceService {
  @Inject(() => DeviceRepository)
  deviceRepository!: IDeviceRepository;

  @Inject(() => ImageRepository)
  imageRepository!: IImageRepository;

  @Inject(() => DeviceImageRepository)
  deviceImageRepository!: IDeviceImageRepository;

  @Inject(() => DeviceCategoryRepository)
  deviceCategoryRepository!: IDeviceCategoryRepository;

  async getAllDevice(limit: number, page: number): Promise<{rows: Device[], count: number}> {
    try {
      const allDevice = await this.deviceRepository.getAllDevice(limit, page);
      return allDevice;
    } catch (err) {
      throw err;
    }
  }

  async getDeviceById(id: number): Promise<Device | null> {
    try {
      const device = await this.deviceRepository.getDeviceById(id);
      return device;
    } catch (err) {
      throw err;
    }
  }

  async deleteDeviceById(id: number): Promise<void> {
    try {
      await this.deviceRepository.deleteDeviceById(id);
    } catch (err) {
      throw err;
    }
  }

  async addDevice(
    name: string,
    price: number,
    category_id: number | number,
    images: string[] | undefined,
    roomId: number | undefined
  ): Promise<Device> {
    try {
      const newDevice = await this.deviceRepository.createDevice(name, price, category_id, roomId);
      if (images) {
        const imagesObject = await Promise.all(
          images.map(async (url) => {
            return await this.imageRepository.createImage(url);
          })
        );
        const roomImagePromises = imagesObject.map((image) => {
          return this.deviceImageRepository.createDeviceImage(
            newDevice.roomId,
            image.imageID
          );
        });
        await Promise.all(roomImagePromises);
      }
      return newDevice;
    } catch (err) {
      throw err;
    }
  }

  async getCategoryOfDevice(id: number[]): Promise<DeviceCategory | null> {
    try {
      const category = await this.deviceCategoryRepository.getCategoryOfDevice(id);
      return category;
    }catch(err){
      throw err;
    }
  }

  async updateDevice(id: number, newData: any): Promise<Device | null> {
    try {
      return await this.deviceRepository.updateDeviceById(id, newData);
    }catch(err) {
      throw err;
    }
  }
}