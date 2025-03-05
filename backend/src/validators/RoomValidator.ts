
import { NextFunction, Request, Response } from "express";
import { body, check, param } from "express-validator";

export const validateRoomId = [
  param("roomId")
    .notEmpty()
    .withMessage("roomId is required")
    .isNumeric()
    .isLength({ min: 1 })
    .withMessage("roomId must be an integer"),
];

export const validateRoom = [
  body("roomNumber")
    .notEmpty()
    .withMessage("roomNumber is required")
    .isInt()
    .withMessage("roomNumber must be an integer"),
    body("description").notEmpty().withMessage("description is required").isString().withMessage("description must be a string"),
  body("status")
    .optional()
    .isIn(["Đang cho thuê", "Phòng trống"])
    .withMessage("status là đang cho thuê hoặc phòng trống"),
  body("roomArea")
    .notEmpty()
    .withMessage("room_area is required")
    .isNumeric()
    .withMessage("room_area phải là số")
    .isLength({ min: 0 })
    .withMessage("room_area phải lớn hơn 0"),
  body("max_occupancy")
    .optional()
    .isInt()
    .withMessage("max_occupancy phải là số nguyên")
    .isLength({ min: 0 })
    .withMessage("max_occupancy phải lớn hơn không"),
  body("price")
    .notEmpty()
    .withMessage("room phải có giá")
    .isNumeric()
    .withMessage("giá phải là số")
    .isLength({ min: 0 })
    .withMessage("giá phải là số dương"),
];

const removeRoomId = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.hasOwnProperty('roomId')) {
    delete req.body.roomId;
  }
  next();
};

export const validateUpdateRoom = [
  removeRoomId,
  body("roomNumber")
    .optional()
    .notEmpty()
    .withMessage("roomNumber is required")
    .isInt()
    .withMessage("roomNumber must be an integer"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be a string"),
  body("status")
    .optional()
    .isIn(["Đang cho thuê", "Phòng trống"])
    .withMessage("status là đang cho thuê hoặc phòng trống"),
  body("roomArea")
    .optional()
    .notEmpty()
    .withMessage("room_area is required")
    .isNumeric()
    .withMessage("room_area phải là số")
    .isLength({ min: 0 })
    .withMessage("room_area phải lớn hơn 0"),
  body("max_occupancy")
    .optional()
    .isInt()
    .withMessage("max_occupancy phải là số nguyên")
    .isLength({ min: 0 })
    .withMessage("max_occupancy phải lớn hơn không"),
  body("price")
    .optional()
    .notEmpty()
    .withMessage("room phải có giá")
    .isNumeric()
    .withMessage("giá phải là số")
    .isLength({ min: 0 })
    .withMessage("giá phải là số dương"),
];
