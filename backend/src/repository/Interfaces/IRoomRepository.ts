import { BaseInterface } from "./BaseInterface";

import { Room } from "../../models/Room";

export interface IRoomRepository extends BaseInterface {
  getAllRooms(page: number, limit: number): Promise<Room[]>;
  getRoomById(id: number): Promise<Room | null>;
  getRoomByDeviceCategory(
    categoryId: number,
    limit: number,
    offset: number
  ): Promise<{ rows: Room[]; count: number }>;
  deleteRoomById(id: number): Promise<void>;
  createRoom(
    roomNumber: number,
    description: string,
    price: number,
    roomArea: number,
    max_occupancy: number,
    roomStatus: string | undefined
  ): Promise<Room>;
  filterRoomByPrice(leftPrice: number, rightPrice: number, page: number, limit: number): Promise<{rows: Room[], count: number}>;
  getNumberRoom(): Promise<number>;
  updateRoomById(id: string, newData: any): Promise<Room>;
  getRoomByRenterId(renterId: number): Promise<Room | null>;
  getAllRoomNumber(status: string | undefined): Promise<Room[]>;
}
