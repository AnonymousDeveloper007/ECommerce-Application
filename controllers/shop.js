/* const products = []; */
const Product = require('../models/product');
const Cart = require('../models/cart');
/* exports.getAddProduct = (req, res, next) => {
  console.log('In The Admin.js Middleware');
  
  //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  res.render('admin/add-product', { pageTitle: 'Add-Product', path: '/admin/add-product' })

}; */

/* exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  // products.push({ title: req.body.title });
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
}; */

exports.getProducts = (req, res, next) => {
  
  console.log('In the shop.js Middleware');
 /*  const products = Product.fetchAll(); */
 
  //const products = adminData.products;
  //res.send('<h1>Hello From Express JS</h1>')
  //res.sendFile(path.join(__dirname,'../','views','shop.html'));
 /*  const products =  */Product.fetchAll((products) => {
   res.render('shop/product-list', { prods: products, pageTitle: 'shop', path: '/products' });
 });
  console.log('shop.js ');
  
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    console.log(product);
     res.render('shop/product-detail',{product:product,pageTitle:product.title,path:'/products'});

  })
 
}
exports.getIndex = (req, res, next) =>
{
  Product.fetchAll((products) => {
   res.render('shop/index', { prods: products, pageTitle: 'shop', path: '/', hasProducts: products.length > 0 });
 });
}

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if (cartProductData) {
          cartProducts.push({productData:product,qty:cartProductData.qty});
        }
      }
      res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Cart Page',
      products:cartProducts
    })
    
  })
  })
  
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId,product.price)
  })
  /* console.log(prodId); */
  res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  })
 
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/cart',
    pageTitle:'Products in the Cart'
  })
}
exports.getCheckout = (req, res, next) =>
{
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle:'Checkout'
  })
}