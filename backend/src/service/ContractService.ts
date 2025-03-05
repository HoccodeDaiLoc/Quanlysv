import { Service, Inject } from "typedi";
import { Contract } from "../models/Contract";
import { IContractService } from "./Interfaces/IContractService";
import { ContractRepository } from "../repository/ContractRepository";
import { IContractRepository } from "../repository/Interfaces/IContractRepository";
import { AppError } from "../errors/AppError";
import { RoomRepository } from "../repository/RoomRepository";
import { IRoomRepository } from "../repository/Interfaces/IRoomRepository";

@Service()
export class ContractService implements IContractService {
  @Inject(() => ContractRepository)
  contractRepository!: IContractRepository;

  @Inject(() => RoomRepository)
  roomRepository!: IRoomRepository;

  async getAllContracts(limit: number, page: number): Promise<{rows:Contract[], count: number}> {
    try {
      return this.contractRepository.getAll(limit, page);
    } catch (err) {
      throw err;
    }
  }

  async getContractById(id: number): Promise<Contract | null> {
    try {
      return this.contractRepository.getById(id);
    } catch (err) {
      throw err;
    }
  }

  getOneContract(searchConditions: any): Promise<Contract | null> {
    try {
      return this.contractRepository.getOne(searchConditions);
    } catch (err) {
      throw err;
    }
  }

  async updateContractById(id: number, contract: Contract): Promise<Contract> {
    try {
      if (!(await this.contractRepository.getById(id))) {
        throw new AppError("Contract not found", 404);
      }
      const contractNew = await this.contractRepository.updateById(id, contract);
      return contractNew!;
    } catch (err) {
      throw err;
    }
  }

  async deleteContractById(id: number): Promise<boolean> {
    try {
      return await this.contractRepository.deleteById(id);
    } catch (err) {
      throw err;
    }
  }

  async createContract(contract: any): Promise<Contract> {
    try {
      const {
        startDay,
        endDate,
        depositAmount,
        roomId,
        renterId,
      } = contract;
      const newcontract = await this.contractRepository.create(
        startDay,
        endDate,
        depositAmount,
        roomId,
        renterId
      );
      const room = await this.roomRepository.getRoomById(roomId);
      const newData = {
        rentAmount: room?.price,
      };
      await this.contractRepository.updateById(newcontract.contractId, newData);
      return (await this.contractRepository.getById(newcontract.contractId))!;
    } catch (err) {
      throw err;
    }
  }
}
