import express from 'express';
import { validationDto } from '../middleware/validation.middleware';
import authService from '../services/auth.service';

const authController = express.Router();

authController.post("/google/verify", authService.verifyGoogleAndLogin);
authController.post("/login", authService.login);
authController.post("/register", authService.register);
authController.post("/logout", authService.logout);


export default authController;