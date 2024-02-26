const connecttomongo = require('./db.js');
const express=require('express');
const ejsMate=require('ejs-mate');
const methodOverride = require('method-override');


connecttomongo();
var cors = require('cors');
const app=express();
app.use(cors());


app.use('/auth', require('./routes/auth'));
app.use('/Todos',require('./routes/Todos'));

app.listen(3400, () => {
    console.log("Listening at port 3000");
})