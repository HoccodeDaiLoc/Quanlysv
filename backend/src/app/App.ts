import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import globalHandler from "../middlewares/ErrorMiddleware";

import Database from "../config/Database";
import RoomRoutes from "../routes/RoomRoutes";
import { AppError } from "../errors/AppError";
import DeviceRoutes from "../routes/DeviceRoutes";
import DeviceCategoryRoutes from "../routes/DeviceCategoryRoutes";
import RenterRoutes from "../routes/RenterRoutes";
import UserRoutes from "../routes/UserRoutes";
import ContractRoutes from "../routes/ContractRoutes";
import RentalRecordRoutes from "../routes/RentalRecordRoutes";
import WaterReadingRoutes from "../routes/WaterReadingRoutes";
import ElectricReadingRoutes from "../routes/ElectricReadingRoutes";
import BillRoutes from "../routes/BillRoutes";
import PaymentRoutes from "../routes/PaymentRoutes";
import http from "http";
import socketIo from "socket.io";
import session, { Session } from "express-session";
import { Redis } from "../config/Redis";
import RedisStore from "connect-redis";
import { LargeNumberLike } from "crypto";
import NotificationRoutes from "../routes/NotificationRoutes";
dotenv.config();

interface SessionData {
  userId?: string;
  socketId?: string | null;
}

class App {
  public app: Application;
  public server: http.Server;
  public io: socketIo.Server;
  private socketClients: Map<number, string>;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new socketIo.Server(this.server, { cors: { origin: "*" } });
    this.socketClients = new Map();
    this.plugins();
    this.databaseSync();
    // this.useSession();
    this.initSocketIo();
    this.routes();
    this.catchError();
  }

  private databaseSync(): void {
    const database = Database.getInstance();
    database
      .sequelize!.sync({force: false})
      .then(() => {
        // console.log('✅ Cơ sở dữ liệu đã được đồng bộ hóa.');
      })
      .catch((error: Error) => {
        console.error("❌ Lỗi đồng bộ hóa cơ sở dữ liệu:", error);
      });
  }

  private routes(): void {
    this.app.use("/api/room", RoomRoutes);
    this.app.use("/api/device", DeviceRoutes);
    this.app.use("/api/category", DeviceCategoryRoutes);
    this.app.use("/api/renter", RenterRoutes);
    this.app.use("/api/user", UserRoutes);
    this.app.use("/api/contract", ContractRoutes);
    this.app.use("/api/waterReading", WaterReadingRoutes);
    this.app.use("/api/rentalrecord", RentalRecordRoutes);
    this.app.use("/api/electricReading", ElectricReadingRoutes);
    this.app.use("/api/notification", NotificationRoutes);
    this.app.use("/api/bill", BillRoutes);
    this.app.use("/api/payment", PaymentRoutes);
  }

  private plugins(): void {
    this.app.use(express.json());
    this.app.use(cors());
    if (process.env.NODE_ENV === "development") {
      this.app.use(morgan("dev"));
    }
  }

  private catchError(): void {
    this.app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    });
    this.app.use(globalHandler);
  }

  private initSocketIo(): void {
    this.app.set("socket", this.io);
    this.app.set("socketClients", this.socketClients);
    this.io.on("connection", (socket: socketIo.Socket) => {
      let userId:number;
      if (socket.handshake.query.userId) {
        userId = +socket.handshake.query.userId;
      }
      this.socketClients.set(userId!, socket.id);
      socket.on("disconnect", () => {
        this.socketClients.delete(userId);
      });
    });
  }

  private useSession(): void {
    const redis = Redis.getInstance();
    const redisStore = new RedisStore({ client: redis.client });
    this.app.use(
      session({
        store: redisStore,
        secret: process.env.SESSION_SECRET_KEY || "secret-key",
        cookie: { maxAge: 60 * 60 * 24 * 180 },
      })
    );
  }
}

export default new App().server;
