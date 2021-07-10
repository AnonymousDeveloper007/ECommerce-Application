const Product = require('../models/product');
exports.getAddProduct = (req, res, next) => {
  console.log('In The Admin.js Middleware');
  
  /* res.sendFile(path.join(rootDir, 'views', 'add-product.html')); */
  res.render('admin/edit-product', { pageTitle: 'Add-Product', path: '/admin/add-product', editing:false })

};

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  // products.push({ title: req.body.title });
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title,imageUrl,description,price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  console.log('In The get-edit-product Middleware');
  
  /* res.sendFile(path.join(rootDir, 'views', 'add-product.html')); */
  
  const editMode = req.query.edit;
  if (!editMode) { res.redirect('/') };
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', { pageTitle: 'Edit-Product', path: '/admin/add-product',editing:editMode,product:product})
  })
  

};

exports.postEditProduct = (req, res, next) => {
  let prodId = req.body.productId;
  let updatedTitle = req.body.title;
  let updatedPrice = req.body.price;
  let updatedImageUrl = req.body.imageUrl;
  let updatedDesc = req.body.description;
  let updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice);
  updatedProduct.save();
  res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
   res.render('admin/products', { prods: products, pageTitle: 'Admin-Products', path: '/admin/products' });
 });
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products')
}