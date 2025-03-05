import { RenterController } from "../controllers/RenterController";
import {
  validateRenter,
  validateRenterId,
} from "../validators/RenterValidator";
import { validate } from "../validators/Validator";
import BaseRoutes from "./base/BaseRoutes";

class RenterRoutes extends BaseRoutes {
  constructor() {
    super(new RenterController());
  }

  public routes(): void {
    this.router
      .route("/")
      .get(this.controller.getAllRenter)
      .post(validateRenter, validate, this.controller.addRenter);
    this.router
      .route("/:renterId")
      .get(validateRenterId, validate, this.controller.getRenterById)
      .delete(validateRenterId, validate, this.controller.deleteRenterById)
      .put(
        validateRenterId,
        validateRenter,
        validate,
        this.controller.updateRenterById
      );
    this.router.route("/room/:roomId").get(this.controller.getAllRenterOfRoom);
  }
}

export default new RenterRoutes().router;
