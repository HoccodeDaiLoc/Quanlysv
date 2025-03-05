import { Inject, Service } from "typedi";
import { Account } from "../../models/Account";

export interface IAccountService {
  addAccount(
    username: string,
    password: string,
    email: string
  ): Promise<Account>;
  findOneAccount(searchConditions: any): Promise<Account | null>;
  updateAvatar(userId: number, avatar: string): Promise<Account>;
  login(username: string, password: string): Promise<any>;
  updatePassword(numberId: number, passwordCurrent: string, password: string): Promise<any>;
  getAccessTokenByRefreshToken: (refreshToken: string) => Promise<any>;
  forgotPassword(email: string): Promise<void>;
  resetPassword(email: string, token: string, newPassword: string): Promise<void>;
  checkResetToken(email: string, token: string): Promise<boolean>;
}
