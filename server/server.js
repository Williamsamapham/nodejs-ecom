const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config();

const dbConnect = require('./config/dbconnect')
const initRoutes = require('./routes')

const app = express();
const port = process.env.PORT || 8888;
app.use(express.json());
dbConnect();
initRoutes(app);

app.use('/', (req, res) => { res.send("Sever on!") });
app.listen(port, () => {
    console.log('server on ' + port);
})