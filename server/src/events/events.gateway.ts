import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;
  wsClients = [];
  afterInit() {
    this.server.emit('testing', { do: 'stuff' });
  }

  handleConnection(client: any) {
    console.log('new client');
    this.wsClients.push(client);
  }

  handleDisconnect(client) {
    console.log('bye client');
    this.wsClients = [...this.wsClients.filter((x) => x !== client)];
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log(data);
    this.server.emit('events', { data: 'fffkk' });
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  public sendTest(step: number, current: number, total: number) {
    this.server.emit('events', { current, total, step });
  }
}
