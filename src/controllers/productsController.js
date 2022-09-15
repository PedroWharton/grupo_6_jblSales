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
                    association: "users",
                    where: {user_id: req.session.userLogged.user_id}
                }

              ],
              raw: true
            })
        .then(function(products){
            res.render('./products/productCart', {products});
        })
        
    },

    newProduct: function(req, res){
        res.render('./products/newProduct');
    },
    
    newProductFunction: function(req, res){
        function isImage(filename) {

            let extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg':
                    return true
                case '.jpeg':
                    return true
                case  '.png':
                    return true
                case  '.gif':
                    return true    
                default:
                    return false;
            }
        }
        if(isImage(req.file.filename)){
            db.Product.create({
                ...req.body,
                img: req.file.filename
            }).then(function(){
                res.redirect('/')
            })
        }
        else{
            return res.render('./products/newProduct', {
                errors: {
                    avatar:{
                        msg: "Ingrese una imagen en formato valido"
                    }
                },
                oldData: req.body
            })
        }

    },

    editProduct: function(req, res){
        db.Product.findByPk(req.params.id, {
            include: [
                {association: 'category'}
            ]
        }).then(function(product){
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
    }
}

module.exports = productController;