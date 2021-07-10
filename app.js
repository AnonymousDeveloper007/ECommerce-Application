const http = require('http');

const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');
/* const expressHbs = require('express-handlebars'); */

const db = require('./util/database');

const app = express();

const errorController = require('./controllers/error');

/* app.engine('hbs', expressHbs({defaultLayout:null})); */
//app.set('view engine','pug');
app.set('view engine','ejs');
app.set('views','views');


app.use(express.static( 'public'));
app.use('/',express.static(__dirname + 'css'));
/* const adminData = require('./routes/admin'); */
const adminRoutes = require('./routes/admin');
/* const shopRoutes = require('./routes/shop'); */
const shopRoutes = require('./routes/shop');
// Parser Functionality
app.use( bodyParser.urlencoded({extended:false}));

db.execute('SELECT * FROM products')
  .then((result) => { console.log(result)})
  .catch(err => {
    console.log(err)
  })
app.use('/admin',/* adminData.routes */adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404page/* (req,res,next)=>{
 // res.status(404).sendFile(path.join(__dirname,'views','404.html')); 
   res.status(404).render('404',{pageTitle:'Page Not Found'});
} */);

const server  = http.createServer(app);

server.listen(3000);