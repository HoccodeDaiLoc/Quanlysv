import { DeviceCategoryController } from "../controllers/DeviceCategoryController";
import { validateDevice, validateDeviceId } from "../validators/DeviceValidator";
import { validate } from "../validators/Validator";
import BaseRoutes from "./base/BaseRoutes";

class DeviceCategoryRoutes extends BaseRoutes {
  constructor() {
    super(new DeviceCategoryController());
  }

  public routes(): void {
    this.router.route("/").get(this.controller.getAllCategory);
    this.router
      .route("/device").get(this.controller.getCategoryOfDevice);
  }
}

export default new DeviceCategoryRoutes().router;