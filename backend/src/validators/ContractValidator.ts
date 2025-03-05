import { body, param } from "express-validator";
import { NextFunction, Request, Response } from "express";


export const validateContractId = [
  param("contractId")
    .notEmpty()
    .withMessage("contractId is required")
    .isNumeric()
    .withMessage("contractId must be an integer"),
];

export const validateContract = [
  body("startDay")
    .notEmpty()
    .withMessage("startDate is required")
    .isDate()
    .withMessage("startDate must be a valid date"),
  body("endDate")
    .optional()
    .isDate()
    .withMessage("endDate must be a valid date"),
  body("deposit_amount")
    .optional()
    .isNumeric()
    .withMessage("deposit_amount must be a number"),
  body("roomId")
    .notEmpty()
    .withMessage("roomId is required")
    .isNumeric()
    .withMessage("roomId must be an integer"),
  body("renterId")
    .notEmpty()
    .withMessage("renterId is required")
    .isNumeric()
    .withMessage("renterId must be an integer"),
];

const removeContractId = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.hasOwnProperty('contractId')) {
    delete req.body.contractId;
  }
  next();
};

export const validateUpdateContract = [
  removeContractId,
  body("startDay")
    .optional()
    .isDate()
    .withMessage("startDate must be a valid date"),
  body("endDate")
    .optional()
    .isDate()
    .withMessage("endDate must be a valid date"),
  body("rentAmount")
    .optional()
    .isNumeric()
    .withMessage("rentAmount must be a number"),
  body("deposit_amount")
    .optional()
    .isNumeric()
    .withMessage("deposit_amount must be a number"),
  body("roomId")
    .optional()
    .isNumeric()
    .withMessage("roomId must be an integer"),
  body("renterId")
    .optional()
    .isNumeric()
    .withMessage("renterId must be an integer"),
];
