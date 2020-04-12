const express=require('express')
const bodyparser=require('body-parser')
const app=express()

app.use(bodyparser.json())
require('./routes/dialogFlowRoutes')(app)


const PORT=process.env.PORT||8000

app.listen(PORT)