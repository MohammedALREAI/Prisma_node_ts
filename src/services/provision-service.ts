import { Knex } from 'knex';
import {
  ProvisionedComponent,
  RawProvisionedComponent,
  Dealership,
  Device,
  Boat
} from '../@types';
import excelSerialDateToJsDate from '../helpers/excelSerialDateToJsDate';
import _ from 'lodash';
import knex from '../db/knex';
import logger from '../logger';
import createError from 'http-errors';
import { ProvisionedDevice } from '@prisma/client';



/**
 * @class ProvisionService
 */

export  default  class ProvisionService {


  /**
   * @function provisionComponentList
   * 
   * @param rawProvisionedComponetList 
   * @returns 
   */
static provisionComponentList = async (
  rawProvisionedComponetList: RawProvisionedComponent[]
) => {
  try {
    const reprocessedComponentList: {
      device: Device;
      boat: Boat;
      provisionedDevice: ProvisionedDevice;
    }[] = [];

    const processedComponentList: {
      device: Device;
      boat: Boat;
      provisionedDevice: ProvisionedDevice;
    }[] = [];

    const updatedComponentList: {
      device: Device;
      boat: Boat;
      provisionedDevice: ProvisionedDevice;
    }[] = [];

    const componetList = this.sanitizeRawProvisionedComponentList(
      rawProvisionedComponetList
    );

    console.log(componetList);

    await knex.transaction(async (trx: Knex.Transaction) => {
      for await (const componet of componetList) {
        const { boat: boatComponent, device: deviceComponent } = componet;

        const {
          hin,
          gelDate,
          model,
          modelYear,
          engineModel,
          dealershipCode: code
        } = boatComponent;

        const { serial, sim, region } = deviceComponent;

        const [dealership] = await trx<Dealership>('dealership')
          .select('*')
          .where('code', code);

        if (!dealership) {
          throw createError(
            400,
            `Dealership code ${boatComponent.dealershipCode} is invalid`
          );
        }

        let [device] = await trx<Device>('device')
          .select('*')
          .where('serial', serial);

        let [boat] = await trx<Boat>('boat')
          .select('*')
          .where('hin', hin);

        if (device && !boat) {

          //test  
          console.log()
          let [provisionedDevice] = await trx('provisionedDevice')
            .join('boat', 'boat.id', 'provisionedDevice.boatId')
            .join('device', 'device.id', 'provisionedDevice.deviceId')
            .select('*')
            .where('deviceId', device.id);

          const [doesSimExist] = await trx<Device>('device')
            .select('*')
            .where('sim', deviceComponent.sim);

          if (doesSimExist) {
            await trx<Device>('device')
              .update('sim', null)
              .where('sim', device.sim);
          }

          [boat] = await trx<Boat>('boat')
            .insert({
              dealershipId: dealership.id,
              hin,
              model,
              modelYear,
              engineModel,
              gelDate
            })
            .returning('*');

          if (provisionedDevice) {
            [provisionedDevice] = await trx<ProvisionedDevice>(
              'provisionedDevice'
            )
              .update({ boatId: boat.id })
              .where('deviceId', device.id)
              .returning('*');
          } else {
            [provisionedDevice] = await trx<ProvisionedDevice>(
              'provisionedDevice'
            )
              .insert({ boatId: boat.id, deviceId: device.id })
              .returning('*');
          }

          [device] = await trx<Device>('device')
            .update({ sim, region })
            .where('id', device.id)
            .returning('*');

          processedComponentList.push({
            device: {
              ...device
            },
            boat: {
              ...boat
            },
            provisionedDevice: {
              ...provisionedDevice
            }
          });
        } else if (!device && boat) {
          let [provisionedDevice] = await trx('provisionedDevice')
            .join('boat', 'boat.id', 'provisionedDevice.boatId')
            .join('device', 'device.id', 'provisionedDevice.deviceId')
            .select('*')
            .where('boatId', boat.id);

          [device] = await trx<Device>('device')
            .select('*')
            .where('sim', deviceComponent.sim);

          if (device) {
            await trx<Device>('device')
              .update('sim', null)
              .where('sim', device.sim);
          }

          [device] = await trx<Device>('device')
            .insert({ sim, serial, region })
            .returning('*');

          if (provisionedDevice) {
            [provisionedDevice] = await trx<ProvisionedDevice>(
              'provisionedDevice'
            )
              .update({ deviceId: device.id })
              .where('boatId', boat.id)
              .returning('*');
          } else {
            [provisionedDevice] = await trx<ProvisionedDevice>(
              'provisionedDevice'
            )
              .insert({ boatId: boat.id, deviceId: device.id })
              .returning('*');
          }

          [boat] = await trx<Boat>('boat')
            .update({
              dealershipId: dealership.id,
              model,
              modelYear,
              engineModel,
              gelDate
            })
            .where('id', boat.id)
            .returning('*');

          processedComponentList.push({
            device: {
              ...device
            },
            boat: {
              ...boat
            },
            provisionedDevice: {
              ...provisionedDevice
            }
          });
        } else if (device && boat) {
          let [provisionedBoat] = await trx('provisionedDevice')
            .join('boat', 'boat.id', 'provisionedDevice.boatId')
            .join('device', 'device.id', 'provisionedDevice.deviceId')
            .select('*')
            .where('boatId', boat.id);

          let [provisionedDevice] = await trx('provisionedDevice')
            .join('boat', 'boat.id', 'provisionedDevice.boatId')
            .join('device', 'device.id', 'provisionedDevice.deviceId')
            .select('*')
            .where('deviceId', device.id);

          const [doesSimExist] = await trx<Device>('device')
            .select('*')
            .where('sim', deviceComponent.sim);

          if (doesSimExist) {
            await trx<Device>('device')
              .update('sim', null)
              .where('sim', device.sim);
          }

          if (_.isEqual(provisionedBoat, provisionedDevice)) {
            [boat] = await trx<Boat>('boat')
              .update({
                dealershipId: dealership.id,
                model,
                modelYear,
                engineModel,
                gelDate
              })
              .where('id', boat.id)
              .returning('*');

            [device] = await trx<Device>('device')
              .update({ sim, region })
              .where('id', device.id)
              .returning('*');

            processedComponentList.push({
              device: {
                ...device
              },
              boat: {
                ...boat
              },
              provisionedDevice: {
                ...provisionedDevice
              }
            });
          } else {
            if (provisionedBoat) {
              await trx<ProvisionedDevice>('provisionedDevice')
                .delete()
                .where('boatId', boat.id)
                .returning('*');
            }

            if (provisionedDevice) {
              await trx<ProvisionedDevice>('provisionedDevice')
                .delete()
                .where('deviceId', device.id)
                .returning('*');
            }

            [provisionedDevice] = await trx<ProvisionedDevice>(
              'provisionedDevice'
            )
              .insert({ boatId: boat.id, deviceId: device.id })
              .returning('*');
          }

          [boat] = await trx<Boat>('boat')
            .update({
              dealershipId: dealership.id,
              model,
              modelYear,
              engineModel,
              gelDate
            })
            .where('id', boat.id)
            .returning('*');

          [device] = await trx<Device>('device')
            .update({ sim, region })
            .where('id', device.id)
            .returning('*');

          processedComponentList.push({
            device: {
              ...device
            },
            boat: {
              ...boat
            },
            provisionedDevice: {
              ...provisionedDevice
            }
          });
        } else {
          [boat] = await trx<Boat>('boat')
            .insert({
              dealershipId: dealership.id,
              hin,
              model,
              modelYear,
              engineModel,
              gelDate
            })
            .returning('*');

          [device] = await trx<Device>('device')
            .select('*')
            .where('sim', deviceComponent.sim);

          if (device) {
            await trx<Device>('device')
              .update('sim', null)
              .where('sim', device.sim);
          }

          [device] = await trx<Device>('device')
            .insert({ sim, serial, region })
            .returning('*');

          const [provisionedDevice] = await trx<ProvisionedDevice>(
            'provisionedDevice'
          )
            .insert({ boatId: boat.id, deviceId: device.id })
            .returning('*');

          processedComponentList.push({
            device: {
              ...device
            },
            boat: {
              ...boat
            },
            provisionedDevice: {
              ...provisionedDevice
            }
          });
        }
      }
    });

    return {
      processedComponentList
    };
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

/**
 *  @function
 * sanitizeRawProvisionedComponentList
 * @param rawProvisionedComponentList 
 * @returns 
 */

static sanitizeRawProvisionedComponentList = (
  rawProvisionedComponentList: RawProvisionedComponent[]
): ProvisionedComponent[] => {
  return rawProvisionedComponentList.map(provisionedRecord => {
    return {
      boat: {
        hin: String(provisionedRecord.hin),
        gelDate: excelSerialDateToJsDate(
          provisionedRecord.gel_date
        ).toISOString(),
        model: String(provisionedRecord.model),
        modelYear: Number(provisionedRecord.model_year),
        engineModel: String(provisionedRecord.engine_model),
        dealershipCode: Number(provisionedRecord.dealership_id)
      },
      device: {
        serial: String(provisionedRecord.serial),
        region: String(
          provisionedRecord[
            'region (NA for North America, ROW for Rest of World)'
          ]
        ) as 'NA' | 'ROW',
        sim: String(provisionedRecord.sim)
      }
    };
  });
}}