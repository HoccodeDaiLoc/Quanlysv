import { WaterReadingController } from "../controllers/WaterReadingController";
import BaseRoutes from "./base/BaseRoutes";

export class WaterReadingRoutes extends BaseRoutes {
  constructor() {
    super(new WaterReadingController());
  }

  public routes(): void {
    this.router.route("/:id").get(this.controller.getWaterReadingById);
    this.router
      .route("/room/:roomId")
      .get(this.controller.getWaterReadingByRoomIdAndDate)
      .post(this.controller.addWaterReading);
  }
}

export default new WaterReadingRoutes().router;
