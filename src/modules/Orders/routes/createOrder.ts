import {Request, Response} from 'express'
import OrdersController from '../Orders.controller'
import { RequestOrderType } from '../Orders.types'

export const createOrder = async (
  req: Request<null, null, RequestOrderType>,
  res: Response
) => {
  try {
    const createdOrder = await OrdersController.createOrder(req.userId, req.body)
    res.status(200).json({message: "Order created successfully", payload: createdOrder})
  } catch(error) {
    res.status(500).json({error, message: 'Something went wrong...'})
  }
}