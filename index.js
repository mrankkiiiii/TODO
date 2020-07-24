// require to use ejs files
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

// app.use is middleware which is used to passed the form data using express
app.use(express.urlencoded({extended: false}));

//include mongoose file
const db = require('./config/mongoose');

// use for adding layout which installed by npm install express-ejs-layouts
const expresslayouts = require('express-ejs-layouts');
app.use(expresslayouts);

// this is used to add separate css and js files for different pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/', require('./routes'));

// set up the view engine after installing the ejs
app.set('view engine', 'ejs');
app.set('views','./views')

//for static css
app.use(express.static('./assets'));

// check the connection of server
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    
    console.log(`Server is running on port: ${port}`);
});