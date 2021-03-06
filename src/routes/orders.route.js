const express = require('express');
const router = express.Router();
const order = require('../controllers/orders.controller');

router.post('/order', order.create);
router.get('/order/:id', order.getOrder);
router.get('/orders/', order.getOrders);
router.post('/orders/update/:id', order.update);
router.get('/orders/delete/:id', order.removeOne);

module.exports = router;