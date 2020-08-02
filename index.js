// require to use ejs files
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

// app.use is middleware which is used to passed the form data using express
app.use(express.urlencoded({extended: false}));

//include mongoose file
const db = require('./config/mongoose');

//used for session cookie
const session =require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportgoogleoath = require('./config/passport-google-oauth2-strategy');
const passportfacebook = require('./config/passport-facebook-strategy');
const passportgithub = require('./config/passport-github-strategy');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const flashmiddleware = require('./config/flash-middleware');

// adding sass module
const sassMiddleware = require('node-sass-middleware');

//it should be load when in development only not in production mode
    app.use(sassMiddleware({
        src: './assets/scss',
        dest: './assets/css',
        debug: true,
        outputStyle: 'expanded',
        prefix: '/css'
    }));

// use for adding layout which installed by npm install express-ejs-layouts
const expresslayouts = require('express-ejs-layouts');
app.use(expresslayouts);

// this is used to add separate css and js files for different pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine after installing the ejs
app.set('view engine', 'ejs');
app.set('views','./views')

//for static css
app.use(express.static('./assets'));


//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'todo',
    // Todo change the secret before deployment in production mode
    secret: 'blahblah',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 *100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err ||' connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(flashmiddleware.setFlash);
//use express router
app.use('/', require('./routes'));

// check the connection of server
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    } 
    console.log(`Server is running on port: ${port}`);
});