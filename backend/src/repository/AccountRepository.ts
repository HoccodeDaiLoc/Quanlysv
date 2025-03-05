import { Service } from "typedi";
import { Account } from "../models/Account";
import { BaseRepository } from "./BaseRepository";
import { IAccountRepository } from "./Interfaces/IAccountRepository";
import { Renter } from "../models/Renter";

@Service()
export class AccountRepository
  extends BaseRepository<Account>
  implements IAccountRepository
{
  async createAccount(
    username: string,
    password: string,
    renterId: number
  ): Promise<Account> {
    try {
      const newAccount = await Account.create({
        username,
        password,
        renterId,
      });
      return newAccount;
    } catch (err) {
      throw err;
    }
  }

  async getOneAccount(searchConditions: any): Promise<Account | null> {
    try {
      return await Account.findOne({
        where: searchConditions,
      });
    } catch (err) {
      throw err;
    }
  }
  
  async updateAccountById(id: number, newData: any): Promise<void> {
    try {
      await Account.update(newData, {
        where: {
          id: id
        }
      });
    }catch(err) {
      throw err;
    }
  }
}
