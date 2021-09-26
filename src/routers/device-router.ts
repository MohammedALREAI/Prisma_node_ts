import express from 'express';

import * as DeviceController from '../controllers/device-controller';

const router = express.Router();

router.get('/:id', DeviceController.getDevice);
router.get('/', DeviceController.getDevices);
router.post('/:id/sim', DeviceController.updateDeviceSim);
router.post('/:id/boat', DeviceController.updateDeviceBoat);
router.post('/', DeviceController.createDevice);
router.delete('/:id', DeviceController.deleteDevice);

export default router;
