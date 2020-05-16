
const Event = require('../models/events');

module.exports.home = function(req,res){
        return res.render('home',{
            title: "Todo App",
            
        });
}

module.exports.add_data = function(req,res){
    Event.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    },function(err,newEvent){
        if(err)
        {
            console.log('Error in creating a event!');
            return;
        }
        console.log('*********',newEvent);
        return res.redirect('back');
    });
}