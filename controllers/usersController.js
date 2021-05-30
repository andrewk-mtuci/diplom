const connect = require ('../database');

const getUserList = (req, res) => {
  connect.query ('SELECT * FROM `nodejs-login`.users where status = "tutor"',[],(err, result) => {
    res.status(200).send(result);
  })
}

module.exports = {getUserList};