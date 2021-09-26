import express from 'express';

import * as ProvisionController from '../controllers/provision-controller';

const router = express.Router();

router.post('/', ProvisionController.provisionComponentList);

export default router;
