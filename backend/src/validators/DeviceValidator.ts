import { body, param } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validateDeviceId = [
  param("deviceId")
    .notEmpty()
    .withMessage("deviceId is required")
    .isNumeric()
    .isLength({ min: 1 })
    .withMessage("deviceId must be an integer"),
];

export const validateDevice = [
  body("deviceName")
    .notEmpty()
    .withMessage("device_name is required")
    .isString()
    .withMessage("device_name must be an string"),
  body("devicePrice")
    .notEmpty()
    .withMessage("device_price is required")
    .isNumeric()
    .withMessage("device_price phải là số")
    .isLength({ min: 0 })
    .withMessage("device_price phải lớn hơn 0"),
];

const removeDeviceId = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.hasOwnProperty('deviceId')) {
    delete req.body.deviceId;
  }
  next();
};

export const validateUpdateDevice = [
  removeDeviceId,
  body("deviceName")
    .optional()
    .notEmpty()
    .withMessage("device_name is required")
    .isString()
    .withMessage("device_name must be a string"),
  body("devicePrice")
    .optional()
    .notEmpty()
    .withMessage("device_price is required")
    .isNumeric()
    .withMessage("device_price must be a number")
    .isLength({ min: 1 })
    .withMessage("device_price must be greater than 0"),
];
