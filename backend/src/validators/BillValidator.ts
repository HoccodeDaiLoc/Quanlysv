import { body, checkSchema } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const BillIdValidator = checkSchema({
    billId: {
        in: ["params"],
        isNumeric: true,
        errorMessage: "billId is number",
        exists: true,
    }
});

export const BillValidator = checkSchema({
  billStartDate: {
    in: ["body"],
    errorMessage: "billStartDate is required",
    isDate: true,
    exists: true,
  },
  billEndDate: {
    in: ["body"],
    errorMessage: "billEndDate is required",
    isDate: true,
    exists: true,
  },
  payMethod: {
    in: ["body"],
    errorMessage: "payMethod is required",
    isIn: {
      options: [["Tiền mặt", "Chuyển khoản"]],
      errorMessage: 'payMethod must be either "Tiền mặt" or "Chuyển khoản"',
    },
  },
  billStatus: {
    in: ["body"],
    errorMessage: "status is required",
    isIn: {
      options: [["Đã thanh toán", "Chưa thanh toán"]],
      errorMessage:
        'status must be either "Đã thanh toán" or "Chưa thanh toán"',
    },
  },
  roomId: {
    in: ["body"],
    errorMessage: "roomId is required",
    isInt: true,
    exists: true,
  },
});

const filterFields = (req: Request, res: Response,next: NextFunction) => {
  for (const field in req.body) {
    if (field !== "paymentMethod" && field !== "status") {
      delete req.body[field];
    }
  }
  next();
};

export const BillUpdateValidator = [
  filterFields,
  body("paymentMethod")
    .optional()
    .isIn(["tiền mặt", "chuyển khoản"])
    .withMessage('paymentMethod must be either "tiền mặt" or "chuyển khoản"'),
  body("status")
    .optional()
    .isIn(["đã thanh toán", "chưa thanh toán"])
    .withMessage('status must be either "đã thanh toán" or "chưa thanh toán"'),
];
