import { createClient, RedisClientType } from "redis";
import { configDotenv } from "dotenv";
configDotenv();

export class Redis {
  private static instance: Redis;
  public client: RedisClientType;

  public static getInstance(): Redis {
    if (!this.instance) {
      this.instance = new Redis();
    }
    return this.instance;
  }

  private constructor() {
    this.client = createClient({
      url: process.env.REDIS_URI,
    });
    this.connectToRedis();
  }

  private connectToRedis(): void {
    this.client.on("connect", () => {
      console.log("✅ Redis Connection has been established successfully.");
    });

    this.client.on("error", (error) => {
      console.error("❌ Unable to connect to the Redis database:", error);
    });

    // Kết nối đến Redis
    this.client.connect().catch((error) => {
      console.error("❌ Redis connection error:", error);
    });
  }
}
