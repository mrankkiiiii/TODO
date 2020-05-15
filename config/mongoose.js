// connect to the library
const mongoose = require('mongoose');

//connect to the databse
mongoose.connect('mongodb://localhost/todo_development');

//acquire the connection to check it it is successfull

const db = mongoose.connection;

db.on('err',console.error.bind(console,'Error connecting with database'));

db.once('open',function(){
    console.log("Successfully connected with Database");

});

