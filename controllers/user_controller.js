module.exports.signin = function(req,res){
    return res.render('sign_in',{
        title: "sign in"
    })
}

module.exports.signup = function(req,res){
    return res.render('sign_up',{
        title: "sign up"
    })
}