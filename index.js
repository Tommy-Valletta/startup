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
app.use(express.urlencoded({extended:true}));

login(app);
logger(app, expws.getWss('/'));

app.post('/cookie/:name/:value', (req, res, next) => {
  res.cookie(req.params.name, req.params.value);
  res.send({cookie: `${req.params.name}:${req.params.value}`});
});

app.get('/cookie', (req, res, next) => {
  res.send({cookie: req.cookies});
});

app.use(express.static('public'));

app.listen(8080);