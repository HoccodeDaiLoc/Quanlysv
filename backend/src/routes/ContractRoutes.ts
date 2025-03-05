import { ContractController } from "../controllers/ContractController";
import { RentalRecord } from "../models/RentalRecord";
import {
  validateContract,
  validateContractId,
  validateUpdateContract,
} from "../validators/ContractValidator";
import { validateRenterId } from "../validators/RenterValidator";
import { validateRoomId } from "../validators/RoomValidator";
import { validate } from "../validators/Validator";
import BaseRoutes from "./base/BaseRoutes";

class ContractRoutes extends BaseRoutes {
  constructor() {
    super(new ContractController());
  }

  public routes(): void {
    this.router
      .route("/")
      .get(this.controller.getAllContract)
      .post(validateContract, validate, this.controller.addContract);
    this.router
      .route("/:contractId")
      .delete(validateContractId, validate, this.controller.deleteContractById);
    this.router
      .route("/room/:roomId")
      .get(validateRoomId, validate, this.controller.getContractByRoomId);
    this.router
      .route("/renter/:renterId")
      .get(validateRenterId, validate, this.controller.getContractByRenterId);
    this.router
      .route("/:contractId")
      .get(validateContractId, validate, this.controller.getContractById)
      .put(validateContractId, validateUpdateContract ,validate, this.controller.updateContract);
  }
}

export default new ContractRoutes().router;
