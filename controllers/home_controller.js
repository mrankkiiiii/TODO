const Event = require('../models/events');
module.exports.home = function(req,res){
    return res.render('home',
    {
        title :'Todo'
    });
}