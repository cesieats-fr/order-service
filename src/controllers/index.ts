import { Request, Response } from 'express';
import { IOrder, IOrderItems } from 'cesieats-service-types/src/order';
import { Order, OrderItems } from '../database';

const addOrder = async (req: Request, res: Response) => {
  try{
    const order: IOrder = {
      idClient: req.body.idClient,
      idRestaurant: req.body.idRestaurant,
      itemState: 0,
      idDelivery: req.body.idDelivery ?? null,
    };
    const result = await Order.create(order);
    console.log('result: ' + result);
    res.status(200).json(result);
  } catch (error) {
    console.log('[ORDER-SERVICE] addOrder error: '+ error);
    res.status(400).json({message: 'an unexpected error occurred'});
  }
};

const updateOrderState = async (req: Request, res: Response) => {
  try {
    const update = { itemState: req.body.itemState };
    const result = await Order.findByIdAndUpdate(req.body.id, update);
    console.log('result after update: ' + result);
    res.status(200).json(result);
  }  catch (error) {
    console.log('[ORDER-SERVICE] updateOrderState error: '+ error);
    res.status(400).json({message: 'an unexpected error occurred'});
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const result = await Order.findById(req.params.id);
    console.log('result: ' + result);
    console.log('id: ' + req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.log('[ORDER-SERVICE] getOrder error: '+ error);
    res.status(400).json({message: 'an unexpected error occurred'});
  }
};

const getUserOrder = async (req: Request, res: Response) => {
  try {
    const filter = {idClient: (String)(req.params.idClient)};
    const result = await Order.find(filter);
    console.log('result: ' + result);
    res.status(200).json(result);
  } catch (error) {
    console.log('[ORDER-SERVICE] getUserOrder error: '+ error);
    res.status(400).json({message: 'an unexpected error occurred'});
  }
};

const getRestaurantOrder = async (req: Request, res: Response) => {
  try {
    const filter = {idRestaurant: (String)(req.params.idRestaurant)};
    const result = await Order.find(filter);
    console.log('result: ' + result);
    res.status(200).json(result);
  } catch (error) {
    console.log('[ORDER-SERVICE] getRestaurantOrder error: '+ error);
    res.status(400).json({message: 'an unexpected error occurred'});
  }
};

const controller = {
  addOrder,
  updateOrderState,
  getOrder,
  getUserOrder,
  getRestaurantOrder,
};

export default controller;