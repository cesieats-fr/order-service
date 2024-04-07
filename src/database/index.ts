import mongoose, { Schema, model } from 'mongoose';
import { IOrder, IOrderItems } from 'cesieats-service-types/src/order';

const orderSchema = new Schema<IOrder>({
  idRestaurant: { type: String, required: true },
  idClient: { type: String, required: true },
  idDelivery: { type: String, required: false },
  orderState: { type: Number, required: true },
});

const orderItemsSchema = new Schema<IOrderItems>({
  idOrder: { type: String, required: true },
  idItem: { type: String, required: true },
});

export const Order = model<IOrder>('Order', orderSchema);
export const OrderItems = model<IOrderItems>('OrderItems', orderItemsSchema);

export const connectMongoose = () => {
  console.log(`connexion: mongodb://${process.env.DB_URL}/`);
  console.log(`user: ${process.env.DB_USERNAME}`);
  console.log(`password: ${process.env.DB_PASSWORD}`);
  mongoose
    .connect(`mongodb://${process.env.DB_URL}/`, {
      dbName: 'cesieats-service',
      user: process.env.DB_USERNAME,
      pass: process.env.DB_PASSWORD,
    })
    .then(() => {
      console.log('Connected to the database');
    })
    .catch((err) => {
      console.log(err);
    });
};