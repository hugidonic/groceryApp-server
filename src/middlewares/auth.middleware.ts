import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import config from 'config';


export default (req: Request, res:Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.authorization
    if (!token) {
      throw new Error(`Invalid authorization`)
      // return res.status(401).json({error: 'Нет авторизации'})
    }

    const decodedToken = jwt.verify(token, config.get('secretJwt'))
    // @ts-ignore
    req.userId = decodedToken.userId

    next()
  } catch (err) {
    res.status(401).json({message: 'Нет авторизации'})
  }
}
