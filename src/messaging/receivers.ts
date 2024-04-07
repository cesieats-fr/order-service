import { Channel, ConsumeMessage } from 'amqplib';

interface IReceivers {
  channel: Channel;
}

class Receivers implements IReceivers {
  channel: Channel;

  constructor(channel: Channel) {
    this.channel = channel;
    this.loadReceivers();
  }

  loadReceivers() {
    this.receiveHelloWorld();
  }

  receiveHelloWorld() {
    this.channel.consume('hello', (message: ConsumeMessage | null) => {
      if (message) {
        console.log('Received message:', message.content.toString());
      }
    });
  }

  disconnect() {
    this.channel.deleteQueue('hello');
  }
}

export default Receivers;
