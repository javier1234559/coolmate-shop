import express from 'express';
import authService from '../services/auth.service';
import authMiddleware from '../middleware/auth.middleware';

const authController = express.Router();

authController.post("/google/verify", authService.verifyGoogleAndLogin);
authController.post("/login", authService.login);
authController.post("/register", authService.register);
authController.post("/logout", authService.logout);
authController.get("/me", authMiddleware.verifyToken, authService.getIdentity);

export default authController;