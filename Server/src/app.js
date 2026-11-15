const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const networkRoutes = require('./modules/network/network.routes.js');
const deviceRoutes = require('./modules/device/device.routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use('/api/networks', networkRoutes);
app.use('/api/devices', deviceRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// module routes will be added here in later steps

app.use(notFound);
app.use(errorHandler);

module.exports = app;