const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const db = require("../lib/db.js");
const middleware = require("../middleware/index.js");
const hashpw = (password) => {
  const pw = crypto.createHash("md5").update(password).digest("hex");
  return crypto.createHash("sha512").update(pw).digest("hex");
};

module.exports = {
  authenticate(request, response) {
    response.json({
      hello: "🌎",
    });
  },
  login(request, response) {
    let username = request.body.username;
    let password = request.body.password;
    let query =
      "SELECT * FROM tb_user WHERE username='" +
      username +
      "' AND password='" +
      hashpw(password) +
      "'";
    db.query(query, (error, result) => {
      if (error) {
        throw error;
        return response.status(400).send({
          result: 0,
          msg: error,
        });
      }
      if (!result.length) {
        return response.status(401).send({
          result: 0,
          msg: "Username or password is incorrect!",
        });
      } else {
        const role = result[0].type === 0 ? 'user' : 'reseller';
        const token = jwt.sign(
          {
            username: result[0].username,
            id_user: result[0].id_user,
            role: role
          },
          process.env.SECRET,
          {
            expiresIn: "1d",
          }
        );
        return response.status(200).send({
          result: 1,
          token,
          role: role,
          user: result[0],
        });
      }
    });
  },
  register(request, response){
    response.status(404).send({
        result: 0,
        msg: "Coming soon"
    })
  },
  autologin(request, response){
    response.status(200).send({
      result: 1,
      data: request.userData,
    });
  },
};
