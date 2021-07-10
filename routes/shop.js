const express = require('express');

const path = require('path');

const router = express.Router();

/* const adminData = require('./admin') */

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex/* getProducts *//* (req,res,next)=>{
  
console.log('In the shop.js Middleware');
  console.log('shop.js ', adminData.products);
  const products = adminData.products;
//res.send('<h1>Hello From Express JS</h1>')
//res.sendFile(path.join(__dirname,'../','views','shop.html'));
res.render('shop',{prods:products,pageTitle:'shop',path:'/',hasProducts:products.length>0});
} */);

router.get('/products', shopController.getProducts);

router.get('/products/:productId',shopController.getProduct)

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/orders',shopController.getOrders);

router.get('/checkout',shopController.getCheckout);

module.exports = router;