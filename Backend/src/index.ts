import express from "express";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import router from "./routes/MyUserRoute";
import { ErroMiddleware } from "./middleware/error";
mongoose
  .connect(process.env.mongoDb_url as string)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "health is OK!" });
});

app.use("/api/my/user", router);

app.listen(7000, () => {
  console.log("server started at port 7000");
});
app.use(ErroMiddleware);
