import { AuthController } from "../controllers/AuthController";
import { validate } from "../validators/Validator";
import BaseRoutes from "./base/BaseRoutes";
import {auth} from "../middlewares/AuthMiddleware";

class UserRoutes extends BaseRoutes {
  constructor() {
    super(new AuthController());
  }

  public routes(): void {
    this.router.route("/register").post(this.controller.register);
    this.router.route("/login").post(this.controller.login);
    this.router.route("/get-access-token").post(this.controller.getAccessToken);
    this.router.route("/forgotpassword").post(this.controller.forgotPassword);
    this.router.route("/checkresetpasswordtoken").post(this.controller.checkResetToken);
    this.router.route("/resetpassword").post(this.controller.resetPassword);
    this.router.route("/updateAvatar/:userId").put(this.controller.updateAvatar);
    this.router.use(auth);
    this.router.route("/updatePassword").put(this.controller.changePassword);
  }
}

export default new UserRoutes().router;
