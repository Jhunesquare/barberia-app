const express = require('express');
const cors = require('cors');

const authRouter = require('./v1/routes/auth.router');
const clientRouter = require('./v1/routes/client.router');
const businessRouter = require('./v1/routes/business.router');
const scheduleRouter = require('./v1/routes/schedule.router');
const employeeRouter = require('./v1/routes/employee.router');
const productRouter = require('./v1/routes/product.router');
const business_productRouter = require('./v1/routes/business_product.router');

const app = express();
const bodyParser = require('body-parser');

// Habilitar CORS para permitir peticiones desde Flutter
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true })); // Para datos en URL
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/auth', authRouter.router);
app.use('/api/v1/business', businessRouter.router);
app.use('/api/v1/client', clientRouter.router);
app.use('/api/v1/schedule', scheduleRouter.router);
app.use('/api/v1/employees', employeeRouter.router);
app.use('/api/v1/product', productRouter.router);
app.use('/api/v1/business_product', business_productRouter.router);

module.exports = {app};