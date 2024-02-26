const connecttomongo = require('./db');
const express=require('express');
const ejsMate=require('ejs-mate');
const methodOverride = require('method-override');
const router = express.Router();

connecttomongo();
const app=express();

app.use(methodOverride('_method'));
app.use('/auth', require('./routes/auth'));

app.listen(3000, () => {
    console.log("Listening at port 3000");
})