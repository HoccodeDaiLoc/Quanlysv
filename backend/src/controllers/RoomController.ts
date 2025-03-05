import Container from "typedi";
import { NextFunction, Request, Response } from "express";
import { IRoomService } from "../service/Interfaces/IRoomService";
import { RoomService } from "../service/RoomService";
import { AppError } from "../errors/AppError";
import { IDeviceCategoryService } from "../service/Interfaces/IDeviceCategoryService";
import { DeviceCategoryService } from "../service/DeviceCategoryService";
import { Room } from "../models/Room";

export class RoomController {
  private roomService: IRoomService;
  private deviceCategoryService: IDeviceCategoryService;

  constructor() {
    this.roomService = Container.get(RoomService);
    this.deviceCategoryService = Container.get(DeviceCategoryService);
  }

  getAllRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let limit = Number(req.query["limit"]) as number;
      let page = Number(req.query["page"]) as number;
      if (!page) {
        page = 1;
      }
      if (!limit) {
        limit = 12;
      }
      const allRooms = await this.roomService.getAllRooms(page, limit);
      if (allRooms?.length === 0) {
        return next(new AppError("Không tìm thấy phòng", 404));
      }
      const total = await this.roomService.getNumberRoom();
      const total_pages = Math.ceil(total / limit);
      return res.status(200).json({
        message: "success",
        page,
        limit,
        total,
        total_pages,
        data: allRooms,
      });
    } catch (err) {
      next(err);
    }
  };

  getRoomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = +req.params.roomId as number;
      const room = await this.roomService.getRoomById(roomId);
      if (!room) {
        return next(new AppError("Không thể tìm thấy phòng", 404));
      }
      const devices = room.device;
      const uniqueCategoryIds = [
        ...new Set(devices
          .filter((device) => device.categoryId !== null)
          .map((device) => device.categoryId)),
      ];
      let category;
      if (uniqueCategoryIds.length !== 0) {
        category = await this.deviceCategoryService.getCategoryOfDevice(
          uniqueCategoryIds
        );
      }
      return res.status(200).json({
        message: "sucess",
        room,
        category,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteRoomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = +req.params.roomId as number;
      const room = await this.roomService.getRoomById(roomId);
      if (!room) {
        return next(new AppError("Phòng không tồn tại", 404));
      }
      await this.roomService.deleteRoomById(roomId);
      return res.status(200).json({
        message: "delete sucessfuly",
      });
    } catch (err) {
      next(err);
    }
  };

  getRoomByCategoryDevice = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let limit = Number(req.query["limit"]) as number;
      let page = Number(req.query["page"]) as number;
      const categoryId = Number(req.query["category_id"]) as number;
      if (!page) {
        page = 1;
      }
      if (!limit) {
        limit = 12;
      }
      const allRooms = await this.roomService.getRoomByDeviceCategory(
        categoryId,
        limit,
        page
      );
      if (allRooms?.count === 0) {
        return next(new AppError("Không tìm thấy phòng", 404));
      }
      const total = allRooms.count;
      const total_pages = Math.ceil(total / limit);
      return res.status(200).json({
        message: "success",
        page,
        limit,
        total,
        total_pages,
        data: allRooms.rows,
      });
    } catch (err) {
      next(err);
    }
  };

  addRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomNumber = req.body["roomNumber"] as number;
      const price = req.body["price"] as number;
      const roomArea = req.body["roomArea"] as number;
      const roomStatus = req.body["status"] as string;
      const max_occupancy = req.body["maxOccupancy"] as number;
      const roomImage = req.body["roomImage"] as string[] | undefined;
      const description = req.body["description"] as string;
      await this.roomService.addRoom(
        roomNumber,
        description,
        price,
        roomArea,
        max_occupancy,
        roomStatus,
        roomImage
      );
      return res.status(201).json({
        message: "add room successfuly",
      });
    } catch (err) {
      next(err);
    }
  };

  filterRoomByPrice = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let limit = Number(req.query["limit"]) as number;
    let page = Number(req.query["page"]) as number;
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 12;
    }
    const lp = Number(req.query["lp"]) as number;
    const rp = Number(req.query["rp"]) as number;
    let rooms: {rows: Room[] | null, count: number};
    if (!lp && !rp) {
      const roomAll = await this.roomService.getAllRooms(page, limit);
      rooms = { rows: roomAll, count: roomAll?.length ?? 0};
    } else {
      rooms = await this.roomService.filterRoomByPrice(lp, rp, page, limit);
    }
    if (rooms.count === 0) {
      return next(new AppError("Không thể tìm thấy phòng tương ứng", 404));
    }
    return res.status(200).json({
      message: "success",
      page,
      limit,
      total: rooms.count,
      total_pages: Math.ceil(rooms.count / limit),
      room: rooms.rows
    });
  };

  updateRoomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = req.params.roomId as string;
      const newData = req.body;
      const room = await this.roomService.updateRoomById(roomId, newData);
      return res.status(200).json({
        message: "update successfuly",
        room,
      });
    } catch (err) {
      next(err);
    }
  };

  getRoomByRenterId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const renterId = +req.params.renterId as number;
      const room = await this.roomService.getRoomByRenterId(renterId);
      if (!room) {
        return next(new AppError("Không tìm thấy phòng", 404));
      }
      return res.status(200).json({
        message: "success",
        room,
      });
    } catch (err) {
      next(err);
    }
  }

  getAllRoomNumber = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = req.query["status"] as string | undefined;
      const roomNumber = await this.roomService.getRoomnumber(status);
      if (roomNumber.length === 0) {
        return next(new AppError("Không tìm thấy phòng", 404));
      }
      return res.status(200).json({
        message: "success",
        data: roomNumber
      });
    }catch(err) {
      next(err);
    }
  }

  addRenterToRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const renterId = +req.params.renterId as number;
      const roomId = +req.body.roomId as number;
      const startDate = req.body["startDate"] as Date;
      await this.roomService.addRenterToRoom(startDate, roomId, renterId);
      return res.status(201).json({
        message: "add renter to room successfuly"
      });
    }catch(err) {
      next(err);
    }
  }

  deleteRenterFromRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const renterId = +req.params.renterId as number;
      const endDate = req.body["endDate"] as Date;
      await this.roomService.deleteRenterFromRoom(endDate, renterId);
      return res.status(200).json({
        message: "delete renter from room successfuly"
      });
    }catch(err){
      next(err);
    }  
  }
}
