const express = require('express');
const mongoose = require('mongoose');

const orderRoutes = require('./routes/api');

const app = express();
app.use(express.json());


// initialize routes
app.use('/api', orderRoutes);



mongoose.connect (
    'mongodb+srv://niharika:u7hDCYBEbZHdEuJz@cluster0.q90m2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
).then(result => {
    app.listen(3000);
})
.catch(err => console.log(err));
//'mongodb+srv://niharika:7pp6v1cu6yIKukJ6@cluster0.vpyts.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//u7hDCYBEbZHdEuJz