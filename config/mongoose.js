// connect to the library
const mongoose = require('mongoose');

const env = require('./environment');
//connect to the databse
mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`,{useCreateIndex: true, useNewUrlParser: true , useUnifiedTopology: true  });

//acquire the connection to check it is successfull
const db = mongoose.connection;

//Error
db.on('err',console.error.bind(console,'Error connecting with database'));

//connect successgully
db.once('open',function(){
    console.log("Successfully connected with Database");
});
module.exports = db;