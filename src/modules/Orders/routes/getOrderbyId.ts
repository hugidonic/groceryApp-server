import { Request, Response } from "express"
import OrdersController from "../Orders.controller"


export const getOrderById = async (req: Request<{orderId: string}>,res: Response) => {
  try {
    const orders = await OrdersController.getOrderById(req.params.orderId)
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ error, message: "Something went wrong..."})
  }
}