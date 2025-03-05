import { Notification } from "../../models/Notification";

export interface IPaymentService {
  paymentWithMoMo(billId: number, rederedirectUrl: string): Promise<any>;
  updatePaymentStatus(billId: number): Promise<Notification>;
}
