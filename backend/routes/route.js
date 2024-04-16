const express = require('express');
const routers = express.Router();
const  upload  = require('../middleware/fileupload');
const productimport = require("../controllers/productimport");
const productexport = require('../controllers/productexport');
const {updateEmailCounter,sendMail} = require("../controllers/mail");
const productfetch = require('../controllers/productfetch');

routers.post("/upload",upload.single('excelFile'),productimport);
routers.get("/export",productexport)
routers.get("/productfetch",productfetch)
//routers.get("/sendmail",updateEmailCounter,sendMail);
module.exports = routers;