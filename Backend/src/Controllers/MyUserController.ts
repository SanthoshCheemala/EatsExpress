import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user";
import { CatchAsyncErrors } from "../middleware/CatchAsyncErrors";
import ErrorHandler from "../middleware/ErrorHandler";

export const createCurrentUser = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { auth0Id } = req.body;
      const existingUser = await UserModel.findOne({ auth0Id });
      if (existingUser) {
        return res.status(200).json();
      }
      const newUser = new UserModel(req.body);
      await newUser.save();
      res.status(201).json({
        success: true,
        newUser,
      });
    } catch (error: any) {
      res.status(500).json({ message: "Error Creating user" });
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const updateCurrentUser = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, addressLine1, country, city } = req.body;

      const user = await UserModel.findById({ _id: req.userId });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.name = name;
      user.addressLine1 = addressLine1;
      user.country = country;
      user.city = city;
      user.save();
      res.send();
    } catch (error: any) {
      res.status(500).json({ message: "Error Updating user" });
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getCurrentUser = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(req.userId);
      const user = await UserModel.findOne({ _id: req.userId });
      if (!user) {
        return next(new ErrorHandler("User Not Found", 404));
      }
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ message: "User Not Found" });
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
