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
    let query = "SELECT * FROM tb_kategori_produk";
    db.query(query, (error, result) => {
      return response.status(200).send({
        result: 1,
        data: result,
      });
    });
  },
  add(request, response) {
    let query =
      "INSERT INTO tb_kategori_produk (nama_kategori, kategori_seo) VALUES (?, ?)";
    const category_seo = request.body.nama_kategori
      .toLowerCase()
      .split(" ")
      .join("-");
    db.query(
      query,
      [request.body.nama_kategori, category_seo],
      (error, result) => {
        return response.status(200).send({
          result: 1,
          data: category_seo,
        });
      }
    );
  },
  product(request, response) {
    let query =
      "SELECT * FROM tb_produk a JOIN tb_kategori_produk b on a.id_kategori_produk=b.id_kategori_produk WHERE a.id_kategori_produk='" +
      request.params.id +
      "'";
    db.query(query, (error, result) => {
      if (!result.length) {
        return response.status(404).send({
          result: 0,
          msg: "Product not found in this category",
        });
      } else {
        return response.status(200).send({
          result: 1,
          data: result,
        });
      }
    });
  },
  remove(request, response) {
    let query = "DELETE FROM tb_kategori_produk WHERE id_kategori_produk='"+request.params.id+"'";
    db.query(query, (error, result) => {
      return response.status(200).send({
        result: 1,
        msg: 'Success deleted category',
      });
    });
  },
  modify(request, response) {
    let query =
      "UPDATE tb_kategori_produk SET nama_kategori=?, kategori_seo=? WHERE id_kategori_produk=?";
    const category_seo = request.body.nama_kategori
      .toLowerCase()
      .split(" ")
      .join("-");
    db.query(
      query,
      [request.body.nama_kategori, category_seo, request.params.id],
      (error, result) => {
        return response.status(200).send({
          result: 1,
          msg: "Success edit category",
        });
      }
    );
  },
};
