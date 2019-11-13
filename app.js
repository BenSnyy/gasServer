require('dotenv').config();
var express = require('express');
var app = express();
var sequelize = require('./db');

sequelize.sync(); //pass {force: true} to reset tables

// Controllers
var log = require('./controllers/logcontroller');
var user = require('./controllers/usercontroller');

app.use(express.json());

app.use('/user', user);

app.use(require('./middleware/headers'))
app.use(require('./middleware/validate-session'))

app.use('/log', log);

app.listen(process.env.PORT, function(){
    console.log(`app listening on ${process.env.PORT}`)
});