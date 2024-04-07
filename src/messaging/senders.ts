import { Channel } from 'amqplib';

interface ISenders {
  channel: Channel;
}

class Senders implements ISenders {
  channel: Channel;

  constructor(channel: Channel) {
    this.channel = channel;
  }

  sendHelloWorld() {
    this.channel.sendToQueue('hello', Buffer.from('Hello, World!'));
  }

  disconnect() {
    this.channel.close();
  }
}

export default Senders;
