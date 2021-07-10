/* const products = []; */
const fs = require('fs');
const path = require('path');
/* const { propfind } = require('../routes/shop'); */
const Cart = require('./cart');
const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');
const getProductsFromFile = (cb) => {
  /*  const p = path.join(path.dirname(require.main.filename), 'data', 'products.json'); */
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }

  })
}
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  
  save() {
    /* products.push(this); */
    /* const p = path.join(path.dirname(require.main.filename), 'data', 'products.json'); */


    getProductsFromFile(products => {
      if (this.id) {
        const exisitingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[exisitingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        })
      }
      else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        })
      }

    })
    /*  fs.readFile(p, (err, fileContent) => {
       let products = [];
       if (!err)
       {
         products = JSON.parse(fileContent);
       }
      
     }) */
  }
   
  static deleteById(id)
  {
    getProductsFromFile(products => {
      
      /* const productIndex = products.findIndex(prod => prod.id === id); */
      const product = products.find(prod => prod.id === id)
      
      const updatedProducts = products.filter(prod => prod.id !== id);
      
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.log(err);
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      })
    
    });
  }

   static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id)
      cb(product)
    })
  }
}