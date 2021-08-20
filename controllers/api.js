const { validationResult } = require('express-validator/check');   
const { Order } = require('../models/order');
//const { counter } = require('../models/count');
const mongoose = require('mongoose');
const counterSchema = new mongoose.Schema(
  {
      counter: {
          type: Number,
          required: true,
      },
      type: {
         type: String,
      enum : ['ORDER'],
      default: 0,
      }
  }
);

const Count = mongoose.model('counter', counterSchema);
// create an order
exports.createOrder = async(req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       const error = new Error('Validation failed, entered data is incorrect.');
     error.statusCode = 422;
        throw error;
      }
   const item = req.body.item;
   const price = req.body.price;
   const order = new Order({
       item: item,
       price: price
   });
   try {
      await order.save();
      const latestCounter = await Count.findOne({type: 'ORDER'});
      console.log(`latestCounter: ${JSON.stringify(latestCounter)}`)
        const counter = (latestCounter.counter || 0) + 1;
       const count = {
        counter: counter,
        type: 'ORDER',
      };
     // const counting = new Count(count);
       //await counting.save();
       // counting.push(order);
        await Count.findOneAndUpdate(
          { type: "ORDER" },
          { counter: counter }
        );
      res.status(201).json({
        message: 'Post created successfully!',
           order: order,
           orderNo: counter
      });
   } catch(err)  {
    if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
   }
};

//getAll
exports.getAllOrders = async (req, res, next) => {
  const orders = await Order.find();
  try {
    res.status(200).json({ message: 'Orders fetched.', orders: orders });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//get
exports.getOrder = async (req, res, next) => {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    try {
      if (!order) {
        const error = new Error('Could not find order.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Order fetched.', order: order });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };




//put
exports.updateOrder = async(req, res, next) => {
    const orderId = req.params.orderId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
      }
      const item = req.body.item;
      const price = req.body.price;
      try {
        const order = await Order.findById(orderId);
        if (!order) {
            const error = new Error('Could not find order.');
            error.statusCode = 404;
            throw error;
          }
          order.item = item;
          order.price = price;
          const result = await order.save();
          res.status(200).json({
              message: 'Order Updated!',
              order: result
          });
      } catch (err)  {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
      }
};

//delete
exports.deleteOrder = async(req, res, next) => {
    const orderId = req.params.orderId;
    try {
        const order = await Order.findByIdAndDelete(orderId);
       
            if (!order) {
                const error = new Error('Could not find order.');
                error.statusCode = 404;
                throw error;
              }
             res.status(200).json({ message: 'Deleted post.' });
            }  catch (err) {
                if (!err.statusCode) {
                err.statusCode = 500;
                }
                next(err);
            }
};