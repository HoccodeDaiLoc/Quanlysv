import { ElectricReadingController } from "../controllers/ElectricReadingController";
import BaseRoutes from "./base/BaseRoutes";

class ElectricReadingRoutes extends BaseRoutes {
  constructor() {
    super(new ElectricReadingController());
  }

  public routes(): void {
    this.router.route("/:id").get(this.controller.getElectricReadingById);
    this.router
      .route("/room/:roomId")
      .get(this.controller.getElectricReadingByRoomIdAndDate)
      .post(this.controller.addElectricReading);
  }
}

export default new ElectricReadingRoutes().router;
