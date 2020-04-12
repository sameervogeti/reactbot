const express=require('express')
const bodyparser=require('body-parser')
const app=express()
const config = require('./config/keys');
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, { useNewUrlParser: true });
require('./models/Registration');

app.use(bodyparser.json())
require('./routes/dialogFlowRoutes')(app)


const PORT=process.env.PORT||8000

app.listen(PORT)