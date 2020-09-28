const middleware = require("../middleware");

const routes = (app) => {
  const user = require("../controllers/user");
  const product = require("../controllers/product");
  const category = require("../controllers/category");

  app.route("/").get((req, response) => {
    response.status(200).send({
      result: 1,
      data: 0,
    });
  });
  app.route("/api/login").post(user.login);
  app.route("/api/register").post(user.register);
  app.route("/api/auto_login").get(middleware.authorization, user.autologin);
  app
    .route("/api/category")
    .get(category.all)
    .post(middleware.authorization, category.add);
  app
    .route("/api/category/:id")
    .get(category.product)
    .put(middleware.authorization, category.modify)
    .delete(middleware.authorization, category.remove);
  app
    .route("/api/product")
    .get(product.all)
    .post(middleware.authorization, product.add);
  app.route("/api/product/:id").get(product.details);
};

module.exports = routes;
