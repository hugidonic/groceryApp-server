// Express and validation
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import config  from 'config';
// Controller
import UserController from "../../User.controller";
// Types
import { LoginRequestBodyType } from "../../User.types";
// Auth helpers
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async (req: Request<null, null, LoginRequestBodyType>, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), message: 'Incorrect data' });
    }

    const { email, password } = req.body;

    // 1) Find the user by email if not return response message "User not found"
    const user = await UserController.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // 2) Compare finded user hashed password and password from request
    const isMatch = await bcrypt.compare(password, user.hashedpassword);
    // 3) if not matching then send response message "Wrong password"
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong email or password' });
    }
    // 4) Create jwt token with userId
    const token = jwt.sign({ userId: user.id }, config.get('secretJwt'), {
      expiresIn: '24h'
    });
    // 5) Send response containing jwtToken, userId, message="You successfully signed in"
    res.status(201).json({ token, userId: user.id, message: 'You successfully signed in' });
  } catch (err) {
    console.error('err:', err);
    res.status(500).json({ err, message: 'Somthing went wrong...' });
  }
}