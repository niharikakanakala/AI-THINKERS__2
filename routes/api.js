const express = require('express');
const orderController = require('../controllers/api');
const { validateOrder} = require('../models/order');
const validateMiddleware = require('../validateMiddleware');
const routes = express.Router();

//get /api/order
routes.get('/order', orderController.getAllOrders);

//get /api/order
routes.get('/order/:orderId', orderController.getOrder);

//post
routes.post('/order',  [validateMiddleware(validateOrder)], orderController.createOrder);

//put
routes.put('/order/:orderId',  [validateMiddleware(validateOrder)], orderController.updateOrder);

//delete
routes.delete('/order/:orderId', orderController.deleteOrder);

module.exports = routes;