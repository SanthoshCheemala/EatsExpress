import express from "express";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import { ErroMiddleware } from "./middleware/error";
import { v2 as cloudinary } from "cloudinary";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute";
mongoose
  .connect(process.env.mongoDb_url as string)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();

app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "health is OK!" });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.listen(7000, () => {
  console.log("server started at port 7000");
});
app.use(ErroMiddleware);
