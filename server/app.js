/* globals __dirname */

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('morgan')('combined'));
app.use('/static', express.static( path.join(__dirname, '../static')));
app.use('/libs', express.static( path.join(__dirname, '../node_modules')));
app.use(require('./controllers'));

module.exports = app;
