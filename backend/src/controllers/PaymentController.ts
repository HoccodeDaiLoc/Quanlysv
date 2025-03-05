import Container from "typedi";
import { PaymentService } from "../service/PaymentService";
import { IPaymentService } from "../service/Interfaces/IPaymentService";
import { NextFunction, Request, Response } from "express";
import { IBillService } from "../service/Interfaces/IBillService";
import { BillService } from "../service/BillService";
import { AppError } from "../errors/AppError";

export class PaymentController {
    private paymentService!: IPaymentService;
    
    private billService!: IBillService;

    constructor() {
        this.paymentService = Container.get(PaymentService);
        this.billService = Container.get(BillService);
    }

    paymentWithMoMo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { billId, rederedirectUrl } = req.body;
            const bill = await this.billService.getBill({billId});
            if(!bill) {
                throw new AppError("Bill not found", 404);
            }
            if(bill.status === "đã thanh toán") {
                throw new AppError("Bill has been paid", 400);
            }
            const result = await this.paymentService.paymentWithMoMo(billId, rederedirectUrl);
            return res.status(200).json({
                message: "success",
                result,
            });
        } catch (err) {
            next(err);
        }
    }

    callBackWithMoMo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(req.body.resultCode !== 0) {
                return next(new Error("Payment failed"));
            }
            const billId = req.body.requestId.replace(req.body.orderId, "");
            const notification = await this.paymentService.updatePaymentStatus(+billId);
            const userIds = notification.notificationSubjects;
            const socketClients = req.app.get("socketClients") as Map<number, string>;
            for (let userId of userIds) {
                if (socketClients.has(userId.userId)) {
                  req.app
                    .get("socket")
                    .to(socketClients.get(userId.userId) as string)
                    .emit("notification", notification);
                }
              }
            return res.status(200).json({
                message: "payment success",
            });
        }catch(err) {
            next(err);
        }
    }
}