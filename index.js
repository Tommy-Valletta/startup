const config = require('config');
const express = require('express');
const expressWS = require('express-ws');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

const login = require('./login');
const logger = require('./logger');

const app = express();
const expws = expressWS(app);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

login(app);
logger(app, expws.getWss('/'));

app.use(express.static('web/dist'));
app.get('*', (req, res, next) => {
  res.sendFile('web/dist/index.html', { root: '.' });
});

app.listen(8080, () => {
  console.log('Node Express Server running on port 8080');
});