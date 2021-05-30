const connect = require ('../database');

const getProductList = (req, res) => {
  connect.query('SELECT * FROM product', [],(err,result) => {
    res.status(200).send(result);
    })
}

module.exports = {getProductList};