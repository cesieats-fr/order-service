import mongoose, { Schema, model } from 'mongoose';
import { IOrder, IOrderItems, IOrderMenus } from 'cesieats-service-types/src/order';

const orderSchema = new Schema<IOrder>({
  idRestaurant: { type: String, required: true },
  idAccountRestaurant: { type: String, required: true },
  idClient: { type: String, required: true },
  idDelivery: { type: String, required: false },
  orderState: { type: Number, required: true },
  price: { type: Number, required: false },
  clientName: { type: String, required: true },
  clientAddress: { type: String, required: true },
  restaurantName: { type: String, required: true },
  restaurantAddress: { type: String, required: true },
  restaurantTelephone: { type: String, required: true },
});

const orderItemsSchema = new Schema<IOrderItems>({
  idOrder: { type: String, required: true },
  idItem: { type: String, required: true },
  amount: { type: Number, required: true },
});

const orderMenusSchema = new Schema<IOrderMenus>({
  idOrder: { type: String, required: true },
  idMenu: { type: String, required: true },
  amount: { type: Number, required: true },
});

export const Order = model<IOrder>('Order', orderSchema);
export const OrderItems = model<IOrderItems>('OrderItems', orderItemsSchema);
export const OrderMenus = model<IOrderMenus>('OrderMenus', orderMenusSchema);

export async function connectMongoose() {
  await mongoose.connect(`mongodb://${process.env.DB_URL}/`, {
    dbName: 'cesieats-service',
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
  });
  console.log('Connected to MongoDB ');
}
