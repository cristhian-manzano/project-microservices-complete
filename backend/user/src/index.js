const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const router = require('./routes'); // Routes

// Database
const { connect } = require('./config/db');

// Logs
const Logger = require('./config/winston');
const MorganMiddleware = require('./config/morgan');
const swaggerDocument = require('../docs/swagger.json');

const app = express();

app.use(MorganMiddleware);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', router);

app.use((err, req, res, next) => {
  Logger.error(err);
  if (res.headersSent) return next(err);
  return res.status(500).json({ message: 'Server error' });
});

// Database
connect().catch((e) => {
  Logger.error(e.message);
});

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  Logger.info(`Running in port ${PORT}`);
});
