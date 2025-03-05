import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
import { Room } from "../models/Room";
import { ElectricityMeterReading } from "../models/ElectricityMeterReading";
import { WaterMeterReading } from "../models/WaterMeterReading";
import { Device } from "../models/Device";
import { RoomImage } from "../models/RoomImage";
import { DeviceImage } from "../models/DeviceImage";
import { Image } from "../models/Image";
import { RentalRecord } from "../models/RentalRecord";
import { Renter } from "../models/Renter";
import { Contract } from "../models/Contract";
import { Bill } from "../models/Bill";
import { BillItem } from "../models/BillItem";
import { Account } from "../models/Account";
import { DeviceCategory } from "../models/DeviceCategory";
import { Notification } from "../models/Notification";
import { NotificationSubject } from "../models/NotificationSubject";

dotenv.config();

class Database {
  public sequelize: Sequelize | undefined;

  private MySQL_DB = process.env.MySQL_DB as string;
  private MySQL_HOST = process.env.MySQL_HOST as string;
  private MySQL_PORT = process.env.MySQL_PORT as unknown as number;
  private MySQL_USER = process.env.MySQL_USER as string;
  private MySQL_PASSWORD = process.env.MySQL_PASSWORD as string;

  private static instance: Database | null;

  constructor() {
    this.connectToMySQL();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private async connectToMySQL(): Promise<void> {
    this.sequelize = new Sequelize({
      database: this.MySQL_DB,
      host: this.MySQL_HOST,
      port: this.MySQL_PORT,
      username: this.MySQL_USER,
      password: this.MySQL_PASSWORD,
      define: {
        timestamps: false,
      },
      logging: false,
      dialect: "mysql",
    });
    this.sequelize.addModels([
      Room,
      ElectricityMeterReading,
      WaterMeterReading,
      Device,
      Image,
      RoomImage,
      DeviceImage,
      Renter,
      RentalRecord,
      Contract,
      Bill,
      BillItem,
      Account,
      DeviceCategory,
      Notification,
      NotificationSubject
    ]);
    await this.sequelize
      .authenticate()
      .then(() => {
        console.log("✅ MySQL Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("❌ Unable to connect to the MySQL database:", err);
      });
  }
}

export default Database;
