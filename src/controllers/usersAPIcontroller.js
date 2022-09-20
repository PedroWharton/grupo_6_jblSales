const db = require('../../database/models');

const usersAPIcontroller ={
    getUsers: function(req,res){
        db.User.findAndCountAll().then(function(result){
            let users = []
            result.rows.map(e => users.push({
                id: e.user_id,
                username: e.username,
                email: e.email,
                detail: `loalhost:300/api/users/${e.user_id}`
            }))
            const response = {
                data: {
                    count: result.count,
                    users: users
                }
            } 
            res.json(response)
        })  
    },
    userDetail: function(req,res){
        db.User.findOne({where: {user_id: req.params.id}}).then(function(result){
            let user = {
                id: result.user_id,
                username: result.username,
                email: result.email,
                avatar: `localhost:3000/images/${result.avatar}`
            }
            const response = {
                data: {
                    user: user
                }
            } 
            res.json(response)
        })  
    }

}

module.exports = usersAPIcontroller;