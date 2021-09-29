import { Namespace, Socket, Server } from 'socket.io';
import logger from '../lib/logger';

const clientHandler = (client: Namespace, io: Server) => {
  client.on('connection', (socket: Socket) => {
    socket.on('join:room', (hin: string) => {
      handleJoin(socket, hin);
    });
    socket.on('leave:room', (hin: string) => {
      handleLeave(socket, hin);
    });
  });
};

const handleJoin = (socket: Socket, hin: string) => {
  logger.debug(`Client joined room ${hin}`);
  socket.join(hin);
};

const handleLeave = (socket: Socket, hin: string) => {
  logger.debug(`Client left room ${hin}`);
  socket.leave(hin);
};

export default clientHandler;
