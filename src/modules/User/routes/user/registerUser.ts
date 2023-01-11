// Express
import { Request, Response } from "express";
import { validationResult } from "express-validator";
// Controller
import UserController from "../../User.controller";
// Types
import { RegisterRequestBodyType } from "../../User.types";
// Token
import bcrypt from 'bcryptjs';

export default async (req: Request<null, null, RegisterRequestBodyType>, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), message: 'Incorrect data' });
    }

    const { username, email, password } = req.body;
    // 1) Check if the email is already exist
    const candidate = await UserController.findUserByEmail(email);
    if (candidate) {
      return res.status(400).json({ message: 'This user already exists' });
    }
    // 2) Hash the password by bcryptjs
    const hashedPassword = await bcrypt.hash(password, 12);
    // 3) Create new user with email and password
    const user = await UserController.createUser(username, email, hashedPassword);
    // 4) Send response message saying user was created successfully
    return res.status(200).json({ message: 'User created successfully' });
  } catch (err) {
    console.log('err:', err);
  }
}