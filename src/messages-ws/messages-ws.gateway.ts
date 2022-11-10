import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IJwtPayLoad } from '../auth/interfaces';
import { NewMessageDto } from './dtos/new-message.dto';
import { MessagesWsService } from './messages-ws.service';

@WebSocketGateway({cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {


  @WebSocketServer()
    wss:Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService
    ) {

    }

  // ######## Implementing the disconnect method ########
  handleDisconnect(client: Socket) {
    //throw new Error('Method not implemented.');
    // console.log('Client disconnected: ', client.id);
    
    this.messagesWsService.removeClient(client.id);
    // console.log('Connected clients: ', this.messagesWsService.getConnectedClientsCount());
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClientsCount());
  }
  
  // ######## Implementing the connection method ########
  async handleConnection(client: Socket, ) {
    // console.log (client)
    const token = client.handshake.headers.authentication as string;
    let jwsPayload: IJwtPayLoad;

    // ######## Validating the token ########
    try {
      jwsPayload = this.jwtService.verify(token);
      await this.messagesWsService.registerClient(client, jwsPayload.id);
    } catch (error) {
      client.disconnect();
      return;
    };

    // console.log (jwsPayload);
    // console.log('Client connected: ', client.id);
    console.log('Connected clients: ', this.messagesWsService.getConnectedClientsCount().length);
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClientsCount());

  }

  // ######## Listening to event ########
  @SubscribeMessage('message-form-client')
  handleMessageFormClient(client: Socket, payload: NewMessageDto) {
    // console.log('Client: ', client.id);
    // console.log('Message received from client: ', payload);
    let cliente:string;
    cliente=client.id;
    payload.fullname=this.messagesWsService.getFullName(cliente);


    //! Emitir al cliente inicial
    payload.contexto='me';
    payload.contextoClient="cliente Inicial";
    client.emit('message-form-server', payload);

    //! Emitir a todos los clientes conectados menos al cliente inicial
    payload.contexto='others';
    payload.contextoClient="todos los clientes conectados menos al cliente inicial";
    client.broadcast.emit('message-form-server', payload);

    // //! Emitir a todos los clientes conectados
    // payload.contexto='all';
    // payload.contextoCliente="todos los clientes conectados";
    // this.wss.emit('message-form-server', payload);
  }

}
