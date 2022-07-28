const express = require('express');

require('express-async-errors');

const app = express();
const products = require('./routes/products');
const sales = require('./routes/sales');
const errorMiddleware = require('./errors/errorMiddleware');

app.use(express.json());

app.use('/products', products);
app.use('/sales', sales);

app.use(errorMiddleware);

module.exports = app;