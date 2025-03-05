import { BillController } from "../controllers/BillController";
import {
  BillIdValidator,
  BillUpdateValidator,
  BillValidator,
} from "../validators/BillValidator";
import { validateRenterId } from "../validators/RenterValidator";
import { validateRoomId } from "../validators/RoomValidator";
import { validate } from "../validators/Validator";
import BaseRoutes from "./base/BaseRoutes";

class BillRoutes extends BaseRoutes {
  constructor() {
    super(new BillController());
  }
  routes() {
    this.router
      .route("/")
      .post(BillValidator, validate, this.controller.createBill).get(this.controller.getAllBill);
    this.router
      .route("/renter/:renterId")
      .get(validateRenterId, validate, this.controller.getBillByRenter);
    this.router
      .route("/room/:roomId")
      .get(validateRoomId, this.controller.getBillByRoom);
    this.router
      .route("/:billId")
      .put(
        BillIdValidator,
        BillUpdateValidator,
        validate,
        this.controller.updateBill
      ).delete(BillIdValidator, validate, this.controller.deleteBillById);
  }
}

export default new BillRoutes().router;
