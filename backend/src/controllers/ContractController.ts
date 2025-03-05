import Container from "typedi";
import { ContractService } from "../service/ContractService";
import { IContractService } from "../service/Interfaces/IContractService";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export class ContractController {
  private contractService!: IContractService;

  constructor() {
    this.contractService = Container.get(ContractService);
  }

  getAllContract = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let limit = Number(req.query["limit"]) as number;
      let page = Number(req.query["page"]) as number;
      if (!page) {
        page = 1;
      }
      if (!limit) {
        limit = 12;
      }
      const contracts = await this.contractService.getAllContracts(limit, page);
      if (contracts.count === 0) {
        return next(new AppError("No contracts found", 404));
      }
      return res.status(200).json({
        message: "success",
        page,
        limit,
        total: contracts.count,
        total_pages: Math.ceil(contracts.count / limit),
        data: contracts.rows,
      });
    } catch (err) {
      next(err);
    }
  };

  getContractById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contract = await this.contractService.getContractById(
        parseInt(req.params.contractId)
      );
      if (!contract) {
        return next(new AppError("Contract not found", 404));
      }
      return res.status(200).json({
        message: "success",
        contract,
      });
    } catch (err) {
      next(err);
    }
  };

  getContractByRoomId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const roomId = +req.params.roomId as number;
      const contract = await this.contractService.getOneContract({
        roomId: roomId,
      });
      if (!contract) {
        return next(new AppError("Contract not found", 404));
      }
      return res.status(200).json({
        message: "success",
        contract,
      });
    } catch (err) {
      next(err);
    }
  };

  getContractByRenterId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const renterId = +req.params.renterId as number;
      const contract = await this.contractService.getOneContract({
        renterId: renterId,
      });
      if (!contract) {
        return next(new AppError("Contract not found", 404));
      }
      return res.status(200).json({
        message: "success",
        contract,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteContractById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const contract = await this.contractService.deleteContractById(
        parseInt(req.params.contractId)
      );
      if (!contract) {
        return next(new AppError("Contract not found", 404));
      }
      return res.status(200).json({
        message: "success",
        contract,
      });
    } catch (err) {
      next(err);
    }
  };

  addContract = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const contract = await this.contractService.createContract(data);
      return res.status(201).json({
        message: "success",
        contract,
      });
    } catch (err) {
      next(err);
    }
  };

  updateContract = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.contractId as number;
        const newData = req.body;
      const contract = await this.contractService.updateContractById(
        id,
        newData
      );
      return res.status(200).json({
        message: "success",
        contract,
      });
    } catch (err) {
      next(err);
    }
  };
}
