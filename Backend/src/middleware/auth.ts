import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import { CatchAsyncErrors } from "./CatchAsyncErrors";
import jwt from "jsonwebtoken";
import UserModel from "../models/user";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

export const jwtParse = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const Authorization = req.headers["authorization"]; // Corrected to access 'authorization' header specifically
    if (!Authorization || !Authorization.startsWith("Bearer ")) {
      return res.sendStatus(401);
    }
    const token = Authorization.split(" ")[1];
    try {
      const decoded = jwt.decode(token) as jwt.JwtPayload;
      if (!decoded || !decoded.sub) {
        // Added check for decoded and decoded.sub
        return res.sendStatus(401); // Ensures decoded and decoded.sub are not undefined
      }
      const auth0Id: string = decoded.sub; // Corrected syntax error here
      const user = await UserModel.findOne({ auth0Id });
      if (!user) {
        return res.sendStatus(401);
      }
      req.userId = user._id.toString();
      req.auth0Id = auth0Id;
      next();
    } catch (error) {
      return res.sendStatus(401);
    }
  }
);
