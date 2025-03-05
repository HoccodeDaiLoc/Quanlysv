import { Room } from "../../models/Room";

export interface IRoomService {
  getAllRooms(page: number, limit: number): Promise<Room[] | null>;
  getRoomById(id: number): Promise<Room | null>;
  getRoomByDeviceCategory(
    categoryId: number,
    limit: number,
    offset: number
  ): Promise<{ rows: Room[]; count: number }>;
  deleteRoomById(id: number): Promise<void>;
  addRoom(
    roomNumber: number,
    description: string,
    price: number,
    roomArea: number,
    maxOccupancy: number,
    roomStatus: undefined | string,
    images: string[] | undefined
  ): Promise<void>;
  filterRoomByPrice(
    leftPrice: number,
    rightPrice: number,
    page: number,
    limit: number
  ): Promise<{ rows: Room[]; count: number }>;
  getNumberRoom(): Promise<number>;
  updateRoomById(id: string, newData: any): Promise<Room>;
  getRoomByRenterId(renterId: number): Promise<Room>;
  getRoomnumber(status: string | undefined): Promise<Room[]>;
  addRenterToRoom(startDate: Date, roomId: number, renterId: number): Promise<void>;
  deleteRenterFromRoom(endDate: Date, renterId: number): Promise<void>;
}
