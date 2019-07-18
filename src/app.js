const express = require('express')
const bodyParse = require('body-parser')
const morgan = require('morgan');

//configuracion
require('dotenv').config();
const app = express()

require('./database');
//moddlwares
app.use(morgan('dev'));
app.use(bodyParse.urlencoded({ extended: false }))
app.use(bodyParse.json())

app.set('port',process.env.PORT || 3000)

app.use(require("./api/routers/index"));

app.listen(app.get('port'),()=>{
    console.log("Listening in the port %d",app.get('port'))
})