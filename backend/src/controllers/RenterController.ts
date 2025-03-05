import Container from "typedi";
import { IRenterService } from "../service/Interfaces/IRenterService";
import { RenterService } from "../service/RenterService";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export class RenterController {
  private renterService!: IRenterService;

  constructor() {
    this.renterService = Container.get(RenterService);
  }

  getAllRenter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let limit = Number(req.query["limit"]) as number;
      let page = Number(req.query["page"]) as number;
      if (!page) {
        page = 1;
      }
      if (!limit) {
        limit = 12;
      }
      const renterList = await this.renterService.getAllRenter(page, limit);
      if (renterList.count === 0) {
        return next(new AppError("Không thể tìm thấy người thuê", 404));
      }
      return res.status(200).json({
        message: "success",
        page,
        limit,
        total: renterList.count,
        total_pages: Math.ceil(renterList.count / limit),
        renterList: renterList.rows,
      });
    } catch (err) {
      next(err);
    }
  };

  getRenterById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params["renterId"] as number;
      const renter = await this.renterService.getRenterById(id);
      if (!renter) {
        return next(new AppError("Không thể tìm thấy người thuê", 404));
      }
      return res.status(200).json({
        message: "success",
        renter,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteRenterById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = +req.params["renterId"] as number;
      const renter = await this.renterService.getRenterById(id);
      if (!renter) {
        return next(new AppError("Người thuê không tồn tại", 404));
      }
      await this.renterService.deleteRenterById(id);
      return res.status(200).json({
        message: "delete successfuly",
      });
    } catch (err) {
      next(err);
    }
  };

  addRenter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        name,
        dateOfBirth,
        address,
        phone,
        email,
        cccd,
        roomId,
        checkInDate,
        checkOutDate,
      } = req.body;
      const newRenter = await this.renterService.addRenter(
        name,
        dateOfBirth,
        address,
        phone,
        email,
        cccd,
        roomId,
        checkInDate,
        checkOutDate
      );
      return res.status(201).json({
        message: "add renter successfuly",
        newRenter,
      });
    } catch (err) {
      next(err);
    }
  };

  updateRenterById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = +req.params["renterId"] as number;
      const newData = req.body;
      const updatedRenter = await this.renterService.updateRenterById(
        id,
        newData
      );
      return res.status(200).json({
        message: "update renter successfuly",
        updatedRenter,
      });
    } catch (err) {
      next(err);
    }
  };

  getAllRenterOfRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let limit = Number(req.query["limit"]) as number;
      let page = Number(req.query["page"]) as number;
      if (!page) {
        page = 1;
      }
      if (!limit) {
        limit = 12;
      }
      const roomId = +req.params["roomId"] as number;
      const renterList = await this.renterService.getAllRenterOfRoom(roomId, limit, page);
      if(renterList.count === 0) {
        return next(new AppError("Không thể tìm thấy người thuê", 404));
      }
      return res.status(200).json({
        message: "success",
        data: renterList.rows
      });
    }catch(err) {
      next(err);
    }
  }
}
