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

export async function connectMongoose() {
  return await mongoose.connect(`mongodb://${process.env.DB_URL}/`, {
    dbName: 'cesieats-service',
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
  });
}
