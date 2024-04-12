import express, { Router } from 'express';
import controller from '../controllers';
import { middleware } from '../middlewares';

const router: Router = express.Router();

router.use(middleware);

// Ajoute une commande
router.post('/addOrder', controller.addOrder);

// Change l'état d'une commande [Waiting=0, GoingToRestaurant=1, Delivering=2, Delivered=3]
router.post('/updateOrderState', controller.updateOrderState);

// Retourne une commande
router.get('/getOrder/:id', controller.getOrder);

// Retourne toutes les commandes grâce à des filtres [idUser, idRestaurant, orderState]
router.get('/getAllClientOrders', controller.getAllClientOrders);

router.get('/getAllRestaurantOrders', controller.getAllRestaurantOrders);

// Supprime une commande
router.delete('/deleteOrder', controller.deleteOrder);

router.post('/addOrderItems', controller.addOrderItems);

router.post('/addOrderMenus', controller.addOrderMenus);

export default router;
