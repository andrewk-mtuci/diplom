const connect = require('../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

exports.login = async (req,res) => {
  try {
    const { email, password } = req.body;

    if( !email || !password ) {
      return res.status(400).render('login', {
        message: 'Please provide an email and password'
      })
    }
    connect.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      console.log(results);
      if (!results || !(await bcrypt.compare(password, results[0].password))) {
        res.status(401).render('login', {
          message: 'Email or Password is incorrect'
        })
    } else {
      const id = results[0].id;

      const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      console.log("The token is: " + token);

      const cookieOption = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
      }

      res.cookie('jwt', token, cookieOption);
      res.status(200).redirect("/profile");
     }

    })

  } catch (error) {
    console.log(error);
  }
}

exports.register = (req, res) => {
  console.log(req.body);

  const { username, email, status, password, passwordConfirm } = req.body;

  connect.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
    console.log(results)
    if(error) {
      console.log(error);
    }

    if(results.length > 0) {
      return res.render('register', {
        message: 'That email is already in use'
      });
    } else if(password !== passwordConfirm) {
      return res.render('register', {
        message: 'Password do not match'
      });
    }

    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    connect.query('INSERT INTO users SET ?', {username: username, email:email, status: status, password: hashedPassword }, (error, result) => {
      if(error) {
        console.log(error);
      } else {
        console.log(results);
        return res.render('register', {
          message: 'User registered'
        });
      }
    })
  });
}

exports.isLoggedIn = async (req, res, next) => {
  // console.log(req.cookies);
  if( req.cookies.jwt) {
    try {
      //1) verify the token
      const decoded = await promisify(jwt.verify)(req.cookies.jwt,
        process.env.JWT_SECRET
      );

      console.log(decoded);

      //2) Check if the user still exists
      connect.query('SELECT * FROM users WHERE user_id = ?', [decoded.id], (error, result) => {
        console.log(result);
        if(!result) {
          return next();
        }

        req.user = result[0];
        console.log("user is")
        console.log(req.user);
        return next();

      });
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    next();
  }
}

exports.logout = async (req, res) => {
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true
  });
  res.status(200).redirect('/');
}