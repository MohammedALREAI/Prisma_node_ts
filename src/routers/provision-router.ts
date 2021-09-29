import {Router} from 'express';

import * as ProvisionController from '../controllers/provision-controller';

const router = Router();

router.post('/', ProvisionController.provisionComponentList);

export default router;
