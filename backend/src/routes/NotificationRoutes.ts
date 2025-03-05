import { NotificationController } from "../controllers/NotificationController";
import BaseRoutes from "./base/BaseRoutes";

class NotificationRoutes extends BaseRoutes {
    constructor() {
        super(new NotificationController());
    }

    public routes(): void {
        this.router.route("/user/:userId").get(this.controller.getListNotificationByUserId);
        this.router.route("/:notificationId").put(this.controller.updateNotification);
        this.router.route("/changeread/:notificationId").post(this.controller.changeRead);
    }
}

export default new NotificationRoutes().router;