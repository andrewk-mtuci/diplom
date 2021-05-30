const express = require('express');
const { getUserList }  = require('../controllers/usersController');

const router = express.Router ();

router.get('/tutor-list', getUserList); // http://localhost:3001/users/tutor-list

module.exports = router;