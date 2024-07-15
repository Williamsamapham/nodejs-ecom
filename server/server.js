const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config();

const dbConnect = require('./config/dbconnect')

const initRoutes = require('./routes')

const app = express();

const port = process.env.PORT || 8888;

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser())

dbConnect();
initRoutes(app);

app.use('/', (req, res) => { res.send("Sever on!") });
app.listen(port, () => {
    console.log('server on ' + port);
})