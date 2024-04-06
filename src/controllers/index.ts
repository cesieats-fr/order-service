import { Request, Response } from 'express';
import { IOrder, IOrderItems } from 'cesieats-service-types/order';
import { Order, OrderItems } from '../database';

const addOrder = async (req: Request, res: Response) => {
  const order: IOrder = {
    id: '0',
    idClient: '0',
    idRestaurant: '0',
    itemState: 0,
    idDelivery: '0',
  };
  const result = await Order.create(order);
  console.log(result);
  res.status(200).json(result);
};

//  
const changeOrderState = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello, world!' });
};

const getOrder = async (req: Request, res: Response) => {
  const result = await Order.findById(req.query.id);
  console.log(result);
  res.status(200).json(result);
};

const getUserOrder = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello, world!' });
};

const getRestaurantOrder = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello, world!' });
};

const controller = {
  addOrder,
  changeOrderState,
  getOrder,
  getUserOrder,
  getRestaurantOrder,

};


export default controller;