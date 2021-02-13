const express = require('express');
const { initialData } = require('../../controller/admin/initialData');
const router = express.Router();


router.post( '/admin/initialdata', initialData);


 module.exports = router;