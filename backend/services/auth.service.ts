import { OAuth2Client } from 'google-auth-library';
import config from '../config/config';
import { Request, Response } from 'express';
import connectDB from '../database/data-source';
import { User } from '../entities/user.entity';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';

class authService {
  static userRepository = connectDB.getRepository(User);

  static generateAccessToken = (user: User) => {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      config.jwtSecret,
      { expiresIn: "1d" }
    );
  }

  static generateRefreshToken = (user: User) => {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      config.jwtSecret,
      { expiresIn: "365d" }
    );
  }

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user && validPassword) {
      const accessToken = authService.generateAccessToken(user);
      const refreshToken = authService.generateRefreshToken(user);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
      });

      //return user except password
      const { password, ...userWithoutPassword } = user;
      logger.info(`User ${user.email} logged in`);
      logger.debug(`userWithoutPassword: ${JSON.stringify(userWithoutPassword)}`);

      res.status(200).send({ ...userWithoutPassword, accessToken });
    }
  }

  static register = async (req: Request, res: Response) => {
    try {
      const { name, email, password, phone } = req.body;
      const role = 'user';

      // Validate user input
      if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Check if email is already in use
      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      const newUser = this.userRepository.create({
        name,
        email,
        password: hashedPassword,
        phone,
        role,
      });

      // Save the new user
      await this.userRepository.save(newUser);
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error registering user', error });
    }
  };

  static verifyGoogleAndLogin = async (req: Request, res: Response) => {
    try {
      const clientId = config.googleClientID;
      const token = req.body.credentialToken;

      // Verify the token
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientId,
      });

      // Get the JSON with all the user info
      const payload: any = ticket.getPayload();
      const { email, name, picture } = payload;
      console.log(payload)

      // Check if user exists
      let user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        //if not exist create new user 
        const newUser = this.userRepository.create({
          name,
          email,
          avatar_img: picture,
          is_google: true,
          role: 'user',
        });
        user = await this.userRepository.save(newUser);
      }

      // return token to login
      const accessToken = authService.generateAccessToken(user);
      const refreshToken = authService.generateRefreshToken(user);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
      });

      //return user except password
      const { password, ...userWithoutPassword } = user;

      logger.info(`User ${user.email} logged in`);
      logger.debug(`accessToken: ${JSON.stringify(accessToken)}`);

      res.status(200).send({ ...userWithoutPassword, accessToken });
    } catch (error) {
      console.error('Error fetching user information', error);
      res.status(500).send('Error fetching user information');
    }
  }

  static logout = async (req: Request, res: Response) => {
    res.clearCookie('refreshToken');
    res.status(200).send('Logged out successfully');
  }

  static getIdentity = async (req: Request, res: Response) => {
    const me = req.user;
    // Get user from database
    let user = await this.userRepository.findOne({ where: { email: me.email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    //return user except password
    const { password, ...userWithoutPassword } = user;
    return res.status(200).json(userWithoutPassword);
  }

}

export default authService;