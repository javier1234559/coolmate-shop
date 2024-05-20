import jwt from "jsonwebtoken";
import config from "../config/config";
import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

const authMiddleware = {
  verifyToken: (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json("You're not authenticated");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json("Token not provided");
    }


    jwt.verify(token, config.jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }
      req.user = user;
      logger.info("middleware authen" + req);
      next();
    });
  },

  verifyTokenAndAdminRole: (req: Request, res: Response, next: NextFunction) => {
    logger.info("middleware admin role" + req);
    authMiddleware.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.role == "admin") {
        next();
      } else {
        return res.status(403).json("You're not allowed to access this route");
      }
    });
  },

};

export default authMiddleware;