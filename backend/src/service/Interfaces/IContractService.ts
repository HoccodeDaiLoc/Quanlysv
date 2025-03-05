import { Contract } from "../../models/Contract";

export interface IContractService {
    getAllContracts(limit: number, page: number): Promise<{rows:Contract[], count: number}>;
    getContractById(id: number): Promise<Contract | null>;
    getOneContract(searchConditions: any): Promise<Contract | null>;
    deleteContractById(id: number): Promise<boolean>;
    updateContractById(id: number, contract: Contract): Promise<Contract>;
    createContract(contract: any): Promise<Contract>;
}