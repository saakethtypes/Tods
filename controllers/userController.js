//Imports
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

//Route functions req->res
exports.registerUser = async (req, res, next) => {
  try {
    const pass = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);

    let user = {
      username: req.body.username,
      password: hash,
      firstname: req.body.firstname,
      user_todos: req.body.user_todos,
      user_theme: req.body.user_theme
    };
    //Db save
    user = await User.create(user);

    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) {
          //Response
          return res.json({ err: err });
        } //TODO can remove jwt from registeration
        return res.json({
          msg: "User created",
          user: user,
          token
        });
      }
    );
  } catch (err) {
    return res.json({
      err: err
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ username: req.body.username }).then(
      user => {
        if (user) {
          bcrypt.compare(req.body.password, user.password).then(match =>
            match
              ? jwt.sign(
                  { id: user._id },
                  process.env.JWT_SECRET,
                  { expiresIn: 3600 },
                  (err, token) => {
                    if (err) {
                      return res.json({ err: err });
                    }
                    return res.json({
                      msg: "User Logged",
                      token,
                      logged: true,
                      fn:user.firstname
                    });
                  }
                )
              : res.json({ msg: "Wrong password", logged: false })
          );
        } else {
          return res.json({ msg: "Username does not exist", logged: false });
        }
      }
    );
  } catch (err) {
    return res.json({
      err: err
    });
  }
};
