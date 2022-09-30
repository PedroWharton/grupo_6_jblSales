const db = require('../../database/models');

const categoryController ={
    //CRUD categorias a traves de APIS
createCategory: function(req,res){
    db.Category.create({name: req.params.category}).then(function(category){
        res.json(category)
    })  
},
updateCategory: function(req,res){
    db.Category.update(req.body.name, {where: {name: req.params.category}}).then(function(category){
        res.json(category)
    })  
},
destroyCategory: function(req,res){
    db.Category.destroy({where: {name: req.params.category}}).then(function(category){
        res.json(category)
    })  
},
getCategories: function(req,res){
    db.Category.findAndCountAll().then(function(category){
        res.json(category)
    }).catch(function(err){
        console.log(err);
    })
}

}

module.exports = categoryController;