// require the events db 
const Event = require('../models/events');

// controller for home 
module.exports.home = function(req,res){
       Event.find({user: req.user._id},function(err,event){
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
        console.log('*********',newEvent);
        return res.redirect('back');
    });
}

// //for deleting a event from DB
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
    //if user has to delete only one event
    // if(typeof(id)=='string'){
    //     Event.findByIdAndDelete(id,function(err){
    //             console.log(id);
    //     });
    // }
     //if user has to delete multiple events simultaneously
    // else{
    //     for(i in id){
    //             Event.findByIdAndDelete(id[i],function(err){
    //             if(err)
    //             {
    //                 console.log('Error in deleting the event from database');
    //                 return;
    //             }
    //         });
    //     }
    // }
    return res.redirect('back');
}