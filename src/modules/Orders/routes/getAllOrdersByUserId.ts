import {Request, Response} from 'express'
import OrdersController from '../Orders.controller'
import { OrderType } from '../Orders.types'

export const getAllOrdersByUserId = async (
  req: Request,
  res: Response
) => {
  try {
    const allOrders: OrderType[] = await OrdersController.getAllOrdersByUserId(req.userId)
    res.status(200).json(allOrders)
  } catch(error) {
    res.status(500).json({error, message: 'Something went wrong...'})
  }
}