
const Event = require('../models/events');

module.exports.home = function(req,res){
       Event.find({},function(err,event){
        if(err)
        {
            console.log('Error in fetching events from DB');
            return;
        }
        return res.render('home',{
            title: "Todo App",
            event_List: event
        });
   });
}

//for adding a event in DB
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

// //for deleting a event from DB
module.exports.delete_data = function(req,res){
    //get the id from the query in the URL
    let id = (req.body.check);
   
    if(typeof(id)=='string'){
        Event.findByIdAndDelete(id,function(err){
        
        });
    }
    else{
        for(i in id){
                Event.findByIdAndDelete(id[i],function(err){
                if(err)
                {
                    console.log('Error in deleting the event from database');
                    return;
                }
            });
        }
    }
    return res.redirect('back');
}