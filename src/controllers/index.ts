import { Request, Response } from 'express';
import { IOrder } from 'cesieats-service-types/src/order';
import { Order } from '../database';

// Ajoute une commande
const addOrder = async (req: Request, res: Response) => {
  try {
    const order: IOrder = {
      idClient: req.body.idClient,
      idRestaurant: req.body.idRestaurant,
      orderState: 0,
      idDelivery: req.body.idDelivery ?? null,
    };
    const result = await Order.create(order);
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
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const filter = {
      idUser: String(req.query.user),
      idRestaurant: String(req.query.restaurant),
      orderState: req.query.state,
    };
    const result = await Order.find(filter);
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
  getAllOrders,
  deleteOrder,
};

export default controller;
