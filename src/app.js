const express = require('express');
const CORS = require('cors');
const cookieParser = require('cookie-parser');
const hubRoutes = require('./routes/hub.routes');

const app = express();

app.use(CORS({
    origin: ['http://localhost:4200'],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use('/', hubRoutes);

module.exports = app;