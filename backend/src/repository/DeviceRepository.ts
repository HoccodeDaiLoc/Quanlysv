import { Service } from "typedi";
import { Device } from "../models/Device";
import { BaseRepository } from "./BaseRepository";
import { IDeviceRepository } from "./Interfaces/IDeviceRepository";
import { DeviceCategory } from "../models/DeviceCategory";
import { Contract } from "../models/Contract";

@Service()
export class DeviceRepository
  extends BaseRepository<Device>
  implements IDeviceRepository
{
  async getAllDevice(limit: number, page: number): Promise<{rows: Device[], count: number}> {
    try {
      const allDevice = await Device.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        distinct: true,
      });
      return allDevice;
    } catch (err) {
      throw err;
    }
  }

  async getDeviceById(id: number): Promise<Device | null> {
    try {
      const device = await Device.findOne({
        where: {
          devices_id: id,
        },
      });
      return device;
    } catch (err) {
      throw err;
    }
  }

  async deleteDeviceById(id: number): Promise<void> {
    try {
      await Device.destroy({
        where: {
          devices_id: id,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async createDevice(
    name: string,
    price: number,
    category_id: number | undefined,
    roomId: number | undefined
  ): Promise<Device> {
    try {
      const newDevice = await Device.create({
        deviceName: name,
        devicePrice: price,
        categoryId: category_id,
        roomId: roomId,
      });
      return newDevice;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateDeviceById(id: number, newData: any): Promise<Device | null> {
      try {
        await Device.update(newData, {
          where: {
            room_id: id,
          },
        });
        const device = await Device.findOne({
          where: {
            devices_id: id,
          },
        });
        return device!;
    }catch(err) {
      throw err;
    }
  }
}
