const mongoose = require('mongoose');
const Joi = require("joi");


const orderSchema  =  new mongoose.Schema(
    {
        
        item: {
            type: String,
            required: true,
        },
        price: {
           type: Number,
           required: true,
        },
        
        created: {type: Date, 
            default:Date.now}
    }
);

//module.exports = mongoose.model('Order', orderSchema);

const Order = mongoose.model('order', orderSchema);

const validateOrder = (order) => {
    const val = Joi.object({
        item: Joi.string().valid(
            'Mobile', 'Shirt', 'LapTop'
        ).required(),
        price: Joi.number().min(500).max(10000).required(),
    });
    return val.validate(order);
}

module.exports = {
    Order,
    validateOrder
}