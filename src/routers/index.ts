import express, { Router, Request, Response } from 'express';
import controller from './controller';

const router: Router = express.Router();

// ajoute une commande en fonction de l'id User et Id Restaurant
router.post('/addOrder', controller.addOrder);

router.post('/changeOrderState', controller.changeOrderState);

router.get('/getOrder/{idOrder}', controller.getOrder);

router.get('/getAllOrder/user/{idUser}', controller.getUserOrder); 

router.get('/getAllOrder/Restaurant/{idUser}', controller.getRestaurantOrder);

export default router;
