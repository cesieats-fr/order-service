import { Request, Response } from 'express';
import { IOrder, IOrderItems } from 'cesieats-service-types/src/order';
import { Order, OrderItems } from '../database';

const addOrder = async (req: Request, res: Response) => {
  try{
    const order: IOrder = {
      idClient: req.body.idClient,
      idRestaurant: req.body.idRestaurant,
      orderState: 0,
      idDelivery: req.body.idDelivery ?? null,
    };
    const result = await Order.create(order);
    console.log('order: ' + order);
    console.log('result: ' + result);
    res.status(200).json(result);
  } catch (error) {
    console.log('[ORDER-SERVICE] addOrder error: ' + error);
    res.status(400).json({message: 'an unexpected error occurred'});
  }
};

const updateOrderState = async (req: Request, res: Response) => {
  try {
    const update = { orderState: req.body.orderState };
    const result = await Order.findByIdAndUpdate(req.body.id, update);
    console.log('orderState: ' + req.body.orderState);
    console.log('result after update: ' + result);
    res.status(200).json(result);
  }  catch (error) {
    console.log('[ORDER-SERVICE] updateOrderState error: ' + error);
    res.status(400).json({message: 'an unexpected error occurred'});
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const result = await Order.findById(req.params.id);
    console.log('id: ' + req.params.id);
    console.log('result: ' + result);
    res.status(200).json(result);
  } catch (error) {
    console.log('[ORDER-SERVICE] getOrder error: ' + error);
    res.status(400).json({message: 'an unexpected error occurred'});
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const filter = {
      idUser: (String)(req.query.user),
      idRestaurant: (String)(req.query.restaurant),
      orderState: req.query.state,
    };
    const result = await Order.find(filter);
    console.log('filter: ' + filter);
    console.log('result: ' + result);
    res.status(200).json(result);
  } catch (error) {
    console.log('[ORDER-SERVICE] getAllOrder error: ' + error);
    res.status(400).json({message: 'an unexpected error occurred'});
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const result = await Order.findByIdAndDelete(req.body.id);
    console.log('id: ' + req.body.id);
    console.log('result: ' + result);
    res.status(200).json(result);
  } catch (error) {
    console.log('[ORDER-SERVICE] deleteOrder error: ' + error);
    res.status(400).json({message: 'an unexpected error occurred'});
  }
};

const controller = {
  addOrder,
  updateOrderState,
  getOrder,
  getAllOrder,
  deleteOrder,
};

export default controller;