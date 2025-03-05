import { PaymentController } from "../controllers/PaymentController";
import BaseRoutes from "./base/BaseRoutes";

class PaymentRoutes extends BaseRoutes {
  constructor() {
    super(new PaymentController());
  }

  public routes(): void {
    this.router.post("/momo", this.controller.paymentWithMoMo);
    this.router.post("/momo/call-back-with-momo", this.controller.callBackWithMoMo);
  }
}

export default new PaymentRoutes().router;
