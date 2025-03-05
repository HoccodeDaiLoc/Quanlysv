import { body, param } from "express-validator";
import { NextFunction, Request, Response } from "express";


export const validateRenterId = [
  param("renterId")
    .notEmpty()
    .withMessage("renterId is required")
    .isNumeric()
    .isLength({ min: 1 })
    .withMessage("renterId must be an integer"),
];

export const validateRenter = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Date of Birth must be a valid date"),
  body("address")
    .optional()

    .isString()
    .withMessage("Address must be a string"),
  body("phone")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 characters long")
    .isNumeric()
    .withMessage("Phone number must be numeric"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("cccd")
    .optional()
    .isLength({ min: 12, max: 12 })
    .withMessage("CCCD must be 12 characters long")
    .isNumeric()
    .withMessage("CCCD must be numeric"),
];

const removeRenterId = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.hasOwnProperty('renterId')) {
    delete req.body.renterId;
  }
  next();
};

export const validateUpdateRenter = [
  removeRenterId,
  body("name").optional().isString().withMessage("Name must be a string"),
  body("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Date of Birth must be a valid date"),
  body("address")
    .optional()
    .isString()
    .withMessage("Address must be a string"),
  body("phone")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 characters long")
    .isNumeric()
    .withMessage("Phone number must be numeric"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("cccd")
    .optional()
    .isLength({ min: 12, max: 12 })
    .withMessage("CCCD must be 12 characters long")
    .isNumeric()
    .withMessage("CCCD must be numeric"),
];
