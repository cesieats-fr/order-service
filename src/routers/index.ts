import express, { Router } from 'express';
import controller from '../controllers';

const router: Router = express.Router();

// Ajoute une commande
router.post('/addOrder', controller.addOrder);

// Change l'état d'une commande [Waiting=0, GoingToRestaurant=1, Delivering=2, Delivered=3]
router.post('/updateOrderState', controller.updateOrderState);

// Retourne une commande
router.get('/getOrder/:id', controller.getOrder);

// Retourne toutes les commandes grâce à des filtres [idUser, idRestaurant, orderState]
router.get('/getAllOrders', controller.getAllOrders);

// Supprime une commande
router.delete('/deleteOrder', controller.deleteOrder);

export default router;
