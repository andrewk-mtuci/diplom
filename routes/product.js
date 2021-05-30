const express = require('express');
const { getProductList }  = require('../controllers/productsController');

const router = express.Router ();

router.get('/product-list', getProductList); // http://localhost:3001/users/tutor-list

module.exports = router;