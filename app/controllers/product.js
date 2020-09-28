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
  all(request, response) {
    let query = "SELECT * FROM tb_produk";
    db.query(query, (error, result) => {
      return response.status(200).send({
        result: 1,
        data: result,
      });
    });
  },
  details(request, response) {
    let query =
      "SELECT * FROM tb_produk WHERE id_produk='" + request.params.id + "'";
    db.query(query, (error, result) => {
      return response.status(200).send({
        result: 1,
        data: result,
      });
    });
  },
  add(request, response){
    const uid = request.userData.id_user;
    const role = request.userData.role;
    if(role !== 'reseller' || role !== 'admin'){
      return response.status(401).send({
        result: 0,
        msg: "sorry, are you a reseller?"
      })
    }
    return response.status(200).send({
      result: 1,
      data: role
    })
  }
};
