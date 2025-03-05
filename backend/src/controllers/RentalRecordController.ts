import { Request, Response,NextFunction } from "express";
import { Container } from "typedi";

import { IRentalRecordService } from "../service/Interfaces/IRentalRecordService";
import { RentalRecordService } from "../service/RentalRecordService";

export class RentalRecordController {
    private rentalRecordService!: IRentalRecordService;
    
    constructor() {
        this.rentalRecordService = Container.get(RentalRecordService);
    }
    
    createRentalRecord = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const { checkInDate, checkOutDate, roomId, renterId } = req.body;
        const newRental = await this.rentalRecordService.createRentalRecord(
            checkInDate,
            checkOutDate,
            roomId,
            renterId
        );
        return res.status(201).json({
            message: "success",
            rentalRecord: newRental,
        });
        } catch (err) {
        next(err);
        }
    };

    updateRentalRecordByRoomId = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const { roomId } = req.params;
        const rentalRecord = req.body;
        const updatedRental = await this.rentalRecordService.updateRentalRecordByRoomId(
            parseInt(roomId),
            rentalRecord
        );
        return res.status(200).json({
            message: "success",
            rentalRecord: updatedRental,
        });
        } catch (err) {
        next(err);
        }
    };

    updateRentalRecordByRenterId = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const { renterId } = req.params;
        const rentalRecord = req.body;
        const updatedRental = await this.rentalRecordService.updateRentalRecordByRenterId(
            parseInt(renterId),
            rentalRecord
        );
        return res.status(200).json({
            message: "success",
            rentalRecord: updatedRental,
        });
        } catch (err) {
        next(err);
        }
    };

    deleteRentalRecord = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const { id } = req.params;
        const deletedRental = await this.rentalRecordService.deleteRentalRecord(
            parseInt(id)
        );
        return res.status(200).json({
            message: "success",
        });
        } catch (err) {
        next(err);
        }
    }
}