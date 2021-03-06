const express = require('express');
const { requireSignin } = require('../common-middleware');
const { signup, signin} = require('../controller/auth');

const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../validators/auth');
const router = express.Router();


router.post( '/signin', validateSigninRequest, isRequestValidated, signin);

router.post( '/signup', validateSignupRequest, isRequestValidated, signup);

// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user:'Profile' });
// });


 module.exports = router;