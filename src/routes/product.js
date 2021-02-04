const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createProduct } = require('../controller/product');
const product = require('../models/product');
const router = express.Router();
const multer = require('multer');
const shortId = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join( path.dirname(__dirname), 'uploads' )  )
    },
    filename: function (req, file, cb) {
      cb(null, shortId.generate() + '-' + file.originalname )
    }
})
//upload to local storage using MULTER
const upload = multer( { storage } );


router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct );


// router.get('/product/getproduct', getCategories);

 module.exports = router;