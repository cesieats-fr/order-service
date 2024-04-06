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
  console.log('result: ' + result);
  res.status(200).json(result);
};

const updateOrderState = async (req: Request, res: Response) => {
  const update = { itemState: req.body.itemState };
  const result = await Order.findByIdAndUpdate(req.body.id, update);
  console.log('result after update: ' + result);
  res.status(200).json(result);
};

const getOrder = async (req: Request, res: Response) => {
  const result = await Order.findById(req.query.id);
  console.log('result: ' + result);
  console.log('id: ' + req.query.id);
  res.status(200).json(result);
};

const getUserOrder = async (req: Request, res: Response) => {
  const filter = {idClient: (String)(req.query.idClient)};
  const result = await Order.find(filter);
  console.log('result: ' + result);
  res.status(200).json(result);
};

const getRestaurantOrder = async (req: Request, res: Response) => {
  const filter = {idRestaurant: (String)(req.query.idRestaurant)};
  const result = await Order.find(filter);
  console.log('result: ' + result);
  res.status(200).json(result);
};

const controller = {
  addOrder,
  updateOrderState,
  getOrder,
  getUserOrder,
  getRestaurantOrder,
};

export default controller;