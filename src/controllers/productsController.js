const path = require('path');
const fs = require('fs');
const db = require('../../database/models')

const productController ={
    
    productsIndex: function(req, res){
        let category = req.params.category;
        if(category != null){
            db.Product.findAll({where: {category : req.params.category}}).then(function(products){
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
        db.Product.findAll({where: {user_id: req.session.userlogged}}).then(function(products){
            res.render('./products/productCart', { products } );
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
        
        console.log(product)
        db.Product.update(product, {where: {product_id: req.params.id}});
		res.redirect('/')
    },

    deleteProduct: function(req, res){
        db.Product.destroy({where: {product_id: req.params.id}}).then(function(){
            res.redirect('/')
        })
    }
}

module.exports = productController;