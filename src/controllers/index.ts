import { Request, Response } from 'express';

const addOrder = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello, world!' });
};

//  
const changeOrderState = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello, world!' });
};

const getOrder = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello, world!' });
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