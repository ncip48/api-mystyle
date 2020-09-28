const jwt = require("jsonwebtoken");
require('dotenv/config')

module.exports = {
  validateRegister: (req, res, next) => {
    if (!req.body.username || req.body.username.length < 4) {
      return res.status(400).send({
        msg: "Please enter a username with min. 4 chars",
      });
    }

    if (!req.body.password || req.body.password.length < 8) {
      return res.status(400).send({
        msg: "Please enter a password with min. 8 chars",
      });
    }

    if (
      !req.body.password_repeat ||
      req.body.password != req.body.password_repeat
    ) {
      return res.status(400).send({
        msg: "Both passwords must match",
      });
    }

    next();
  },
  authorization: (req, res, next) => {
    try {
      const bearer = req.headers.authorization.split(" ")[0];
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET);
      if(bearer !== 'Bearer'){
        return res.status(405).send({
          result: 0,
          msg: "Authorization header false or not match"
        })
      }
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        result: 0,
        msg: "Your session is not valid!, please login again",
      });
    }
  },
  admin: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET);
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        result: 0,
        msg: "Your session is not valid!, please login again",
      });
    }
  },
};
