const middleware = require("../middleware");

const routes = (app) => {
  const user = require("../controllers/user");
  const product = require("../controllers/product");
  const category = require("../controllers/category");

  app.route("/api/login").post(user.login);
  app.route("/api/register").post(user.register);
  app.route("/api/auto_login").get(middleware.authorization, user.autologin);
  app.route("/api/category").get(category.all).post(category.add);
  app.route("/api/category/:id").get(category.product);
  app.route("/api/product").get(product.all);
  app.route("/api/product/:id").get(product.details);
};

module.exports = routes;
