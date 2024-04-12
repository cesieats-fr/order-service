import { Request, Response } from 'express';
import { IOrder } from 'cesieats-service-types/src/order';
import { Order, OrderItems, OrderMenus } from '../database';

// Ajoute une commande
const addOrder = async (req: Request, res: Response) => {
  try {
    const order: IOrder = {
      idClient: res.locals.account._id,
      idRestaurant: req.body.idRestaurant,
      orderState: 0,
      idDelivery: req.body.idDelivery ?? null,
      price: req.body.price,
      clientName: req.body.clientName,
      clientAddress: req.body.clientAddress,
      restaurantName: req.body.restaurantName,
      restaurantAddress: req.body.restaurantAddress,
      restaurantTelephone: req.body.restaurantTelephone,
      idAccountRestaurant: req.body.idAccountRestaurant,
    };
    const result = await Order.create(order);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'an unexpected error occurred', error });
  }
};

const addOrderItems = async (req: Request, res: Response) => {
  try {
    const result = await OrderItems.insertMany(req.body.orderItems);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'an unexpected error occurred' });
  }
};

const addOrderMenus = async (req: Request, res: Response) => {
  try {
    console.log('addOrderMenus, req.body : ', req.body);
    console.log('addOrderMenus, req.body.orderMenus : ', req.body.orderMenus);
    const result = await OrderMenus.insertMany(req.body.orderMenus);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'an unexpected error occurred' });
  }
};

// Change l'état d'une commande [Waiting=0, GoingToRestaurant=1, Delivering=2, Delivered=3]
const updateOrderState = async (req: Request, res: Response) => {
  try {
    const update = { orderState: req.body.orderState };
    const result = await Order.findByIdAndUpdate(req.body.id, update);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'an unexpected error occurred' });
  }
};

// Retourne une commande
const getOrder = async (req: Request, res: Response) => {
  try {
    const result = await Order.findById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'an unexpected error occurred' });
  }
};

// Retourne toutes les commandes grâce à des filtres [idUser, idRestaurant, orderState]
const getAllClientOrders = async (req: Request, res: Response) => {
  try {
    const filter = {
      idClient: res.locals.account._id,
      OrderState: req.query.orderState,
    };

    const result = await Order.find(filter).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'an unexpected error occurred' });
  }
};

const getAllRestaurantOrders = async (req: Request, res: Response) => {
  try {
    const result = await Order.find({ idAccountRestaurant: res.locals.account._id }).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'an unexpected error occurred' });
  }
};

// Supprime une commande
const deleteOrder = async (req: Request, res: Response) => {
  try {
    const result = await Order.findByIdAndDelete(req.body.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'an unexpected error occurred' });
  }
};

const controller = {
  addOrder,
  updateOrderState,
  getOrder,
  getAllClientOrders,
  getAllRestaurantOrders,
  deleteOrder,
  addOrderItems,
  addOrderMenus,
};

export default controller;
