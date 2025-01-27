const router = require("express").Router();
const productCtrl = require("../controllers/productCtrl");

router
  .route("/products")
  .get(productCtrl.getProducts)
  .post(productCtrl.createProducts);

router
  .route("/products/:id")
  .delete(productCtrl.deleteProdouct)
  .post(productCtrl.updateProduct); //':' acts as a placeholder for dynamic values

module.exports = router;
