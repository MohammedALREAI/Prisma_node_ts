import express from 'express';
import  BoatController from '../controllers/boat-controller';
import { authenticationMiddleware as authenticate } from '../middleware';
import { body } from 'express-validator';
import { getBoatById ,addBoatGuest, updateBoatName} from '../middleware/express-validator/Boat/getBoat';


const router = express.Router();


/** */
router.get('/', BoatController.getAllBoats);




router.get('/:id',getBoatById, BoatController.getBoat);

router.post('/creatBoat',BoatController.createBoat);

router.patch(
  '/:id/:name/update-name',
  authenticate,
  updateBoatName,  
  BoatController.updateBoatName
);

export default router;
