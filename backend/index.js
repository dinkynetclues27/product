require('dotenv').config();
const sequelize = require('./database');
const express = require('express');
const path = require("path")
const app = express();
const bodyParser = require('body-parser');
const routers = require('./routes/route')
const port = process.env.PORT
const cors = require('cors');

app.use(cors())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(routers);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static('public'));
sequelize;
app.listen(port, () => {
    console.log("Server is running on port 4000");
  });