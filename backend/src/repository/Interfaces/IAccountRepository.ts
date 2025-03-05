import { Account } from "../../models/Account";
import { BaseInterface } from "./BaseInterface";

export interface IAccountRepository extends BaseInterface {
  createAccount(
    username: string,
    password: string,
    renterId: number
  ): Promise<Account>;
  getOneAccount(searchConditions: any): Promise<Account | null>;
  updateAccountById(id: number, newData: any): Promise<void>;
}
