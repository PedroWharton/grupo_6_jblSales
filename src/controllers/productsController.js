const path = require('path');
const fs = require('fs');
const db = require('../../database/models');

const productController ={
    
    productsIndex: function(req, res){
        let category = req.params.category;
        if(category != null){
            db.Product.findAll({where: {category_id : req.params.category}}).then(function(products){
                res.render('./products/products', { products });
            })
        }
        else{
            db.Product.findAll().then(function(products){
                res.render('./products/products', { products });
            })
        }       
    },

    productDetail: (req, res) => {
        db.Product.findByPk(req.params.id).then(function(product){
            res.render('./products/productDetail', { product });
        })      
    },

    productCart: function(req, res){
        db.Product.findAll({
            include: [
                {
                    association: "users"
                },
              ]})
        .then(function(rawproducts){
            let products = []
            for (product of rawproducts){
                if(product.users){
                    for(user of product.users){
                        if(user.user_id == req.session.userLogged.user_id){
                            products.push(product)
                        }
                    }
                }
            }
            res.render('./products/productCart', {products});
        })
        
    },

    newProduct: function(req, res){
        res.render('./products/newProduct');
    },
    
    newProductFunction: function(req, res){
        db.Product.create({
            ...req.body,
            img: req.file.filename
        }).then(function(){
            res.redirect('/')
        })
    },

    editProduct: function(req, res){
        db.Product.findByPk(req.params.id).then(function(product){
            res.render('./products/editProduct', { product });
        })
    },

    editProductFunction: function(req, res){
        let product = {
            ...req.body
        }
        parseInt(product.price)
        for(data in product){
            if(product[data] == ''){
                delete product[data]
            }
        }
        db.Product.update(product, {where: {product_id: req.params.id}});
		res.redirect('/')
    },

    deleteProduct: function(req, res){
        db.Product.destroy({where: {product_id: req.params.id}}).then(function(){
            res.redirect('/')
        })
    },
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

module.exports = productController;