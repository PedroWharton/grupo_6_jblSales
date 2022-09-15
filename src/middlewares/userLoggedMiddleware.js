
const db = require('../../database/models')
const userLoggedMiddleware = function(req, res, next){
    res.locals.isLogged = false;
    if(req.cookies.username && req.path != '/user/logout'){
        db.User.findOne({where: {username: req.cookies.username}, raw: true}).then(function(user){
            if(req.session){
                req.session.userLogged = user
            }
            
        })
    }

    if (req.session && req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged
    }

    next();

    
}

module.exports = userLoggedMiddleware;