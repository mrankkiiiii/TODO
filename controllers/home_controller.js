const Event = require('../models/events');
module.exports.home = function(req,res){
    Event.find({},function(err,event){
        if(err)
        {
            console.log('Error in fetching events from DB');
            return;
        }
        return res.render('event',{
            title: "Todo App",
            event_List: event
        });
   });
}