const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8888;
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/',(req, res)=>{  res.send("Sever on!")});

app.listen(port, ()=>{
    console.log('server on !'+port);
})