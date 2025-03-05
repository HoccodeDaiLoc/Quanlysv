import BaseRoutes from "./base/BaseRoutes";

import { RentalRecordController } from "../controllers/RentalRecordController";

class RentalRecordRoutes extends BaseRoutes {
  constructor() {
    super(new RentalRecordController());
  }

  public routes(): void {
    this.router.route("/").post(this.controller.createRentalRecord);
    this.router
      .route("/room/:roomId")
      .put(this.controller.updateRentalRecordByRoomId);
    this.router
      .route("/renter/:renterId")
      .put(this.controller.updateRentalRecordByRenterId);
  }
}

export default new RentalRecordRoutes().router;
