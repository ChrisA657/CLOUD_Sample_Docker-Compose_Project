require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
//const mysqlConnect = require('./db');

//route handlers
//const routes = require('./routes/routes');
const usersRoutes = require('./routes/users');
const userUpdatesRoutes = require('./routes/user_updates');
const sessionRoutes = require('./routes/session');
const customerDashRoutes = require('./routes/customer_dash');
const farmerDashRoutes = require('./routes/farmer_dash');
const searchRoutes = require('./routes/search');
const productRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

//middle ware

// set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
};

// create the express.js object
const app = express();

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

// specify middleware to use
app.use(bodyParser.json());
app.use(cors({origin: '*'}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//health route
app.get('/health', (request, response, next) => {
  const responseBody = { status: 'up', port: 8000 };
  response.json(responseBody);

  next();
});

//include routes
//app.use('/routes', routes);
app.use('/login', sessionRoutes);
app.use('/account', usersRoutes);
app.use('/search', searchRoutes);
app.use('/settings', userUpdatesRoutes);
app.use('/dashboard/farmer', farmerDashRoutes);
app.use('/dashboard/customer', customerDashRoutes);
app.use('/products', productRoutes);
app.use('/cart', ordersRoutes);


// connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
