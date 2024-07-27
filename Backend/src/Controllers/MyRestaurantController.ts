import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../middleware/ErrorHandler";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import UserModel from "../models/user";

export const CreateMRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingRestaurant = await Restaurant.findOne({
      user: req.userId,
    });

    if (existingRestaurant) {
      return next(new ErrorHandler("Restaurant already exist", 409));
    }

    const imageUrl = await uploadImage(req.file as Express.Multer.File);
    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);

    await restaurant.save();
    res.json(restaurant).status(201);
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const getMyRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingRestaurant = await Restaurant.findOne({
      user: req.userId,
    });

    if (!existingRestaurant) {
      return next(new ErrorHandler("Restaurant doesn't exist", 404));
    }
    res.json(existingRestaurant).status(201);
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const updateMyRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurant = await Restaurant.findOne({
      user: req.userId,
    });

    if (!restaurant) {
      return next(new ErrorHandler("Restaurant doesn't exist", 404));
    }

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    if (req.file) {
      const publicId = extractPublicId(restaurant.imageUrl);
      await cloudinary.v2.uploader.destroy(publicId);
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }
    await restaurant.save();
    res.send(restaurant).status(200);
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataUrI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataUrI);
  return uploadResponse.url;
};

function extractPublicId(url: string): string {
  const parts = url.split("/");
  const publicIdWithExtension = parts[parts.length - 1];
  const publicId = publicIdWithExtension.split(".")[0];
  return publicId;
}
