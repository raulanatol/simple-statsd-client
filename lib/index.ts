import { createSocket, Socket } from 'dgram';
import { formatTags } from './utils';

export class SimpleStatsdClient {
  private socket: Socket;
  private port: number;
  private host: string;
  private debug: boolean;

  constructor(host = 'localhost', port = 8125, debug = false) {
    this.host = host;
    this.port = port;
    this.debug = debug;
  }

  log(message?: any, ...args: any[]) {
    if (this.debug) {
      console.log(message, args); // tslint:disable-line
    }
  }

  async initSocket() {
    return new Promise((resolve, reject) => {
      this.socket = createSocket('udp4');
      this.socket.on('error', err => {
        this.log('Error', err);
        this.socket.close();
      });

      this.socket.on('message', (msg, info) => {
        this.log('OnMessage', msg, info);
      });

      this.socket.on('listening', () => {
        const address = this.socket.address();
        this.log(`server listening ${address.address}:${address.port}`);
      });

      resolve();
    });
  }

  async sendSync(messageToSend: Buffer) {
    return new Promise((resolve, reject) => {
      this.socket.send(messageToSend, 0, messageToSend.length, this.port, this.host, err => {
        if (err) {
          this.log('Error on sendSync', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async send(data: string) {
    if (!this.socket) {
      await this.initSocket();
    }
    const messageToSend = new Buffer(data);
    await this.sendSync(messageToSend);
  }

  async increment(name: string, delta = 1, tags = {}) {
    const message = `${name}${formatTags(tags)}:${delta}|c`;
    await this.send(message);
  }

  async close() {
    return new Promise(resolve => {
      this.socket.close(() => resolve());
    });
  }
}
