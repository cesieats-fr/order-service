import express, { Router, Request, Response } from 'express';
import controller from '../controllers';

const router: Router = express.Router();

// ajoute une commande en fonction de l'id User et Id Restaurant
router.post('/addOrder', controller.addOrder);

router.post('/updateOrderState', controller.updateOrderState);

router.get('/getOrder/:id', controller.getOrder);

router.get('/getAllOrder', controller.getAllOrder); 

router.delete('/deleteOrder', controller.deleteOrder);

export default router;
