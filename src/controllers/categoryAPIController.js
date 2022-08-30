const db = require('../../database/models');

const categoryController ={
    //CRUD categorias a traves de APIS
createCategory: function(req,res){
    db.category.create({name: req.params.category}).then(function(category){
        res.json(category)
    })  
},
updateCategory: function(req,res){
    db.category.update(req.body.name, {where: {name: req.params.category}}).then(function(category){
        res.json(category)
    })  
},
destroyCategory: function(req,res){
    db.category.destroy({where: {name: req.params.category}}).then(function(category){
        res.json(category)
    })  
}

}

module.exports = categoryController;