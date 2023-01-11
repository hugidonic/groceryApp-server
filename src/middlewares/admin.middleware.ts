import { NextFunction, Request, Response } from "express";


export default (req: Request, res:Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.authorization
    if (!token || token != 'admin') {
      return res.status(401).json({error: "Not admin"})
    }
    next()
  } catch (err) {
    res.status(401).json({message: "Not admin"})
  }
}
