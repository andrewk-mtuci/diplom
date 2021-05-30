const express = require('express');
const connect = require('/database');

exports.order = (req, res) => {
  console.log(req.body);

  connect.query('SELECT * FROM orders WHERE user_id = ?',[user_id], async (error, results) => {
    console.log(results)
    if(error) {
      console.log(error);
    } else {
      return res.render('order');
    }
  })
}
// router.get('/order-list', getUserList); // http://localhost:3001/users/tutor-list

module.exports = router;