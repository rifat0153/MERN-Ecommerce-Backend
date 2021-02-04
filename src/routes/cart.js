const express = require('express');
const { requireSignin, userMiddleware } = require('../common-middleware');
const { addItemToCard } = require('../controller/cart');
const router = express.Router();


router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCard);
// router.get('/cart/getcart', getCart);

 module.exports = router;