import Container from "typedi";
import { IAccountService } from "../service/Interfaces/IAccountService";
import { AccountService } from "../service/AccountService";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export class AuthController {
  private accountService!: IAccountService;

  constructor() {
    this.accountService = Container.get(AccountService);
  }

  getRenterById1 = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {};

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password, email } = req.body;
      const newAccount = await this.accountService.addAccount(
        username,
        password,
        email
      );
      return res.status(201).json({
        message: "register successfuly",
        newAccount,
      });
    } catch (err) {
      next(err);
    }
  };

  updateAvatar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {avatar} = req.body;
      const userId = +req.params.userId as number;
      const updateAccount = await this.accountService.updateAvatar(userId, avatar);
      return res.status(200).json({
        message: "update avatar successfuly",
        updateAccount,
      });
    } catch (err) {
      next(err);
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const { user, accessToken, refeshToken } =
        await this.accountService.login(username, password);
      return res.status(200).json({
        message: "login successfuly",
        user,
        accessToken,
        refeshToken,
      });
    } catch (err) {
      next(err);
    }
  };

  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.payload.userId;
      const { passwordCurrent, password } = req.body;
      const { accessToken, refeshToken } =
        await this.accountService.updatePassword(
          userId,
          passwordCurrent,
          password
        );
      return res.status(200).json({
        message: "change password successfuly",
        accessToken,
        refeshToken,
      });
    } catch (err) {
      next(err);
    }
  };

  getAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      const token = await this.accountService.getAccessTokenByRefreshToken(
        refreshToken
      );
      if (token === "") {
        return new AppError("Token hết hiệu lực hoặc không tồn tại", 401);
      }
      const res_token = { type: "Bearer", token: token };
      return res.status(200).json({
        status: "Ok!",
        message: "Get new token successfully!",
        result: res_token,
      });
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      await this.accountService.forgotPassword(email);
      return res.status(200).json({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, token, newPassword } = req.body;
      await this.accountService.resetPassword(email, token, newPassword);
      return res.status(200).json({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };

  checkResetToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, token } = req.body;
      const result = await this.accountService.checkResetToken(email, token);
      return res.status(200).json({
        message: "success",
        result,
      });
    } catch (err) {
      next(err);
    }
  };

}
