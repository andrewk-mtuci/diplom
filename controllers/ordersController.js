const connect = require ('../database');

const getOrderList = (req, res) => {
  connect.query ('SELECT * FROM orders WHERE user_id = ?',[user_id],(err, result) => {
    res.status(200).send(result);
  })
}

module.exports = {getOrderList};