// require the events db 
const Event = require('../models/events');

// controller for home 
module.exports.home = function(req,res){
       Event.find({user: req.user._id},function(err,event){
        if(err)
        {
            req.flash('error', 'Error in fetching events');
            return;
        }
        return res.render('event',{
            title: "Todo App",
            event_List: event
        });
   }).sort('-createdAt');
}

//for adding a event in DB
module.exports.add_data = function(req,res){
    Event.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date,
        user: req.user._id
    },function(err,newEvent){
        if(err)
        {
            console.log('Error in creating a event!');
            return;
        }
        req.flash('alert', newEvent.description + ' - Event successfully added');
        return res.redirect('back');
    });
}

//for deleting a event from DB
module.exports.delete_data = function(req,res){
    //get the id from the query in the URL
    let id = req.body.check;
    
   Event.deleteMany({_id: id},function(err){
    if(err)
        {
            console.log('Error in deleting the event from database');
            return;
        }
   })
    req.flash('alert', 'Event(s) successfully deleted');
    return res.redirect('back');
}