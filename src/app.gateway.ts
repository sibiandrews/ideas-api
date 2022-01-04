import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

@WebSocketGateway(4001)
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  wss;

  private logger = new Logger('AppGateway');

  handleConnection(client: any) {
    this.logger.log('New Client Connected');
    client.emit('connection', 'Successfully connected to server');
  }

  handleDisconnect() {
    this.logger.log('Client disconnected');
  }
}
