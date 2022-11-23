import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities';
import { Server, Socket } from 'socket.io';


// ####### Interface of clients connected ########
interface ConnectClient {
    [id: string]: {
        socket:Socket,
        user: User
    }
}
// ###############################################


@Injectable()
export class MessagesWsService {

    private connectedClients: ConnectClient = {};

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {};

    // ######### Adding a new client to the connected clients ########
    async registerClient(client: Socket, userID: string) {

        const user = await this.userRepository.findOneBy({id: userID});
        if (!user) throw new Error('User not found');
        if (!user.isActive) throw new Error('User is not active');

        await this.checkUserConnected(user);

        this.connectedClients[client.id] = {
            socket: client,
            user,
        }
        // console.log ('Usuarios conectados ',this.connectedClients.socket.socket.id);
    }   

    // ######### Removing a client from the connected clients ########  
    async removeClient(clientId: string) {
        delete this.connectedClients[clientId];        
    }

    // ######### Get count connected clients ########
    getConnectedClientsCount():string[]{
        return Object.keys(this.connectedClients);
    }

    // ######### Get full name of connected clients ########
    getFullName(socketID: string):string{
        return this.connectedClients[socketID].user.fullname;
    }

    // ######### Check if user is connected ######## ????????????????????????
    private async checkUserConnected(user: User) {

        // console.log (Object.values(this.connectedClients).some(client => client.user.id === userID));
        // return Object.values(this.connectedClients).some(client => client.user.id === userID);
        console.log ('imgresa al checkUserConnected');
        for (const clientId of Object.keys(this.connectedClients)) {
            const connectedClient = this.connectedClients[clientId];
            console.log ('ID cliente encontrado: ',connectedClient.socket.id);

            console.log ('ID cliente a consultar : ', user.id);

            if (connectedClient.user.id === user.id) {
                console.log ('Usuario ya estaba conectado', connectedClient.user.id === user.id);
                await this.removeClient(clientId);
                connectedClient.socket.disconnect();
                break;
            }
        }
    };
}

