const express = require('express');
const router = express.Router();
const path = require('path');
/* const rootDir = require('../util/path'); */
const adminController = require('../controllers/admin');
const { route } = require('./shop');


/* const products = []; */  // this array addes in products.js controller
router.get('/add-product', adminController.getAddProduct /* (req, res, next) => {
  console.log('In The Admin.js Middleware');

  //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  res.render('add-product',{pageTitle:'Add-Product',path:'/admin/add-product'})

} */
);

router.get('/products',adminController.getProducts);

router.post('/add-product', adminController.postAddProduct /* (req, res, next) => {
  console.log(req.body);
  products.push({title:req.body.title});
  res.redirect('/');
} */);

router.get('/edit-product/:productId', adminController.getEditProduct);
/* exports.routes = router;
exports.products = products; */

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product',adminController.postDeleteProduct)
 module.exports = router;
