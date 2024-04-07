import * as amqp from 'amqplib';
import Senders from './senders';
import Receivers from './receivers';

interface IMessaging {
  connection: amqp.Connection;
  senders: Senders;
  receivers: Receivers;
}

class Messaging implements IMessaging {
  connection: amqp.Connection;
  senders: Senders;
  receivers: Receivers;

  constructor(connection: amqp.Connection, senders: Senders, receivers: Receivers) {
    this.connection = connection;
    this.senders = senders;
    this.receivers = receivers;
  }

  disconnect() {
    this.senders.disconnect();
    this.receivers.disconnect();
    this.connection.close();
  }
}

export async function connectRabbitMQ() {
  const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_URL}:5672`, {
    username: 'admin',
    password: 'cesieats123',
  });
  console.log('Connected to RabbitMQ ' + connection);
  const sendChannel = await connection.createChannel();
  const receiveChannel = await connection.createChannel();
  const senders = new Senders(sendChannel);
  const receivers = new Receivers(receiveChannel);
  return new Messaging(connection, senders, receivers);
}

export default Messaging;
