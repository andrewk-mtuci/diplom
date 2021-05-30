const express = require('express');
const authController  = require('../controllers/auth');

const router = express.Router ();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('profile', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }
});

router.get('/shop', (req, res) => {
  res.render('shop');
});

router.get('/shopping-cart', (req,res) => {
  res.render('shopping-cart');
})

// router.post('/shopping-cart',(req,res) => {
//   if (!request.body) return res.sendStatus(400);
//   res.send(`${req.body.user_id} - ${req.body.tutor_id} - ${req.body.product_id}`)
// })

module.exports = router;