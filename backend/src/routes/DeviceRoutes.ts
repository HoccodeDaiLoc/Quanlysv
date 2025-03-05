import { DeviceController } from "../controllers/DeviceController";
import {
  validateDevice,
  validateDeviceId,
  validateUpdateDevice,
} from "../validators/DeviceValidator";
import { validate } from "../validators/Validator";
import BaseRoutes from "./base/BaseRoutes";

class DeviceRoutes extends BaseRoutes {
  constructor() {
    super(new DeviceController());
  }

  public routes(): void {
    this.router
      .route("/")
      .get(this.controller.getAllDevice)
      .post(validateDevice, validate, this.controller.addDevice);
    this.router
      .route("/:deviceId")
      .get(validateDeviceId, validate, this.controller.getDeviceById)
      .delete(validateDeviceId, validate, this.controller.deleteDeviceById)
      .put(
        validateDeviceId,
        validateUpdateDevice,
        validate,
        this.controller.updateDeviceById
      );
  }
}

export default new DeviceRoutes().router;
