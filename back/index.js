'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const load = require('express-load');
const database = require('./controllers/catalogoController');
const cors = require('cors')
const app = express();

load('controllers').then('routes').into(app);

process.env.TZ = 'America/Recife';

app.use(bodyParser.json())
app.use('*', cors())

app.listen(5000, function() {
    console.log('Working at port 5000')
})

module.exports = app;
