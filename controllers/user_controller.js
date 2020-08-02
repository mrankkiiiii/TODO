const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req , res){
    User.findById(req.params.id, function(err,user){
        return res.render('users_profile',{
            title: user.name,
            profile_users: user
        });
    });
}

module.exports.signin = function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/event');
    }
    return res.render('sign_in',{
        title: "Todo App"
    })
}

module.exports.signup = function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/event');
    }
    return res.render('sign_up',{
        title: "Sign Up"
    })
}

module.exports.create = function(req,res){
    if(req.body.password!=req.body.confirm_password){
       req.flash('error', 'Passwords do not match!');
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        //Error in finding user in signing up 
        if(err){
            req.flash('error',err); 
            return; }
        if(!user){
            User.create(req.body, function(err,user){
                //Error in creating user while signing up
                if(err){
                    req.flash('error',err);
                return; 
            }
                req.flash('warning', 'You have signed up, login to continue!');
                return res.redirect('/user/sign-in');
            });
        }
        else{
            req.flash('error', 'Email is already registered!');
            return res.redirect('back');
        }
    });
}
module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err)
                {
                    console.log('*****Multer Error',err);
                    return;
                }
                user.name = req.body.name
                user.email = req.body.email
                if(req.file)
                {
                     if(user.avatar)
                     { //check if the file exists or not
                        if (fs.existsSync(path.join(__dirname ,'..',user.avatar))) 
                        {
                            fs.unlinkSync(path.join(__dirname ,'..',user.avatar));                  
                        }
                     }
                    // this is saving the path of the uploaded file into the avatar field in the user 
                    user.avatar = User.avatarPath + '/' + req.file.filename; 
                }
                user.save();
                req.flash('warning','Profile Updated');
                return res.redirect('back');
            });
        }catch (err) {
            req.flash('error',err);  
            return res.redirect('back');
        }
    }
    else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}

module.exports.createSession = function(req,res){
    req.flash('success', 'Welcome ',req.user.name,'You Logged In Successfully');
    return res.redirect('/event');
}

// for the signout
module.exports.destroySession = function(req,res){  
    let name = req.user.name;
    req.logout();
    req.flash('warning', `You have Logged out, Have a Nice Day ${name} :)`);
    return res.redirect('/user/sign-in');
}