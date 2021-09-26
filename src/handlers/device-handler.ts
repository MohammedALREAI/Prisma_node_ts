import { Namespace, Socket, Server } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import jwt from 'jsonwebtoken';
import sanitizer from './sanitizer';
import logger from '../logger';
import prisma from '../db/prisma';


type Query={
  [key: string]:string | number,
  deviceSerial: string;
  hin: string;
  deviceId: number;
};


const deviceHandler = (device: Namespace, io: Server) => {
  /**
   * MIDDLWARE
   */
  /**
   * Authenticated device
   */
  device.use(authenticateDevice);

  /**
   * Finds the device and pair a Hull # to the device serial
   */
  device.use(findDevice);

  /**
   * Sets the inital connection
   */
  device.use(setDeviceToConnected);

  /**
   * HANDLERS
   */
  device.on('connection', (socket: Socket) => {
    socket.on('telemetry', (telemetry: Buffer) => {
      handleTelemetry(io, socket, telemetry);
    });
    socket.on('disconnect', () => {
      handleDisconnect(io, socket);
    });
  });
};

const authenticateDevice = (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) => {
  try {
    const { token } = <any>socket.handshake.query;

    jwt.verify(token, 'osmosis', (e, decoded) => {
      if (e) {
        logger.error(e);

        logger.debug('Device with invalid key failed to join the server.');

        socket.disconnect();
      } else {
        if (decoded) {
          const { id } = decoded;

          if (id) {
            logger.debug(`${decoded?.id} has authenticated with the server.`);

            const query = socket.handshake.query as {
              deviceSerial: string;
            };

            query.deviceSerial = Number(id).toString();

            next();
          }
        }
      }
    });
  } catch (e) {
    next(e);
  }
};

const findDevice = async (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) => {
  try {
    const query = socket.handshake.query as Query;

    const { deviceSerial } = query;

    // const res = await Telemetry.findOne({ serial: deviceSerial }).lean();
    const res = await prisma.device.findUnique({
      where: {
        serial: deviceSerial
      },
      include: {
        provisionedDevice: {
          include: {
            boat: true
          }
        }
      }
    });

    if (!res) {
      logger.error(`${deviceSerial} not found!`);

      socket.disconnect();
    }
    console.log(res);

    if (res?.provisionedDevice?.boat?.hin) {
      query.hin = res.provisionedDevice.boat.hin;
      query.deviceId = res.id;

      logger.debug(
        `Hull # ${res.provisionedDevice.boat.hin} is paired with device serial ${deviceSerial}`
      );

      return next();
    }
    logger.error(`No hin found for this device!`);

    socket.disconnect();
  } catch (e) {
    logger.error(e);
    next(e);
  }
};

const setDeviceToConnected = async (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) => {
  try {
    const query = socket.handshake.query as Query;
    const { deviceSerial, hin } = query;

    logger.debug(`${deviceSerial} on ${hin} has connected.`);

    await prisma.deviceTelemetry.upsert({
      where: {
        deviceId: query.deviceId
      },
      update: { isWebSocketConnected: true },
      create: {
        deviceId: query.deviceId,
        isWebSocketConnected: true
      }
    });

    next();
  } catch (e) {
    logger.error(e);
    next(e);
  }
};

const handleDisconnect = async (io: Server, socket: Socket) => {
  try {
    const query = socket.handshake.query as Query;

    const { deviceSerial, hin } = query;

    logger.debug(`${deviceSerial} on ${hin} has disconnected.`);

    const updatedTelemetry = await prisma.deviceTelemetry.update({
      where: {
        deviceId: query.deviceId
      },
      data: {
        isWebSocketConnected: false,
        isSleeping: false,
        gpsSpeedKmh: 0,
        gpsSpeedMph: 0,
        engineSpeed: 0,
        gpsMode: 0,
        gsmSignalQualityBars: 0
      }
    });

    io.of('client')
      .to(hin)
      .emit('telemetry:update', updatedTelemetry);
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

const handleTelemetry = async (io: Server, socket: Socket, buf: Buffer) => {
  const query = socket.handshake.query as  Query;

  const { deviceSerial, hin, deviceId } = query;

  const telemetry = await sanitizer(buf);

  logger.debug(`${hin}:`);
  logger.debug(telemetry);

  const updatedTelemetry = await prisma.deviceTelemetry.upsert({
    where: {
      deviceId: deviceId
    },
    update: { ...telemetry },
    create: {
      deviceId: deviceId,
      ...telemetry
    }
  });

  io.of('client')
    .to(hin)
    .emit('telemetry:update', updatedTelemetry);
};

export default deviceHandler;
