const path = require('path');
const fs = require('fs');
const Product = require('../models/Product');
const User = require('../models/User');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController ={
    
    productsIndex: function(req, res){
        let category = req.params.category;
        if(category != null){
            filteredproducts = products.filter(product => product.category == category);
            res.render('./products/products', { products: filteredproducts });
        }
        else{
            res.render('./products/products', { products });
        }       
    },

    productDetail: (req, res) => {
        let product = Product.findByPk(req.params.id)
        res.render('./products/productDetail', {product: product });
    },

    productCart: function(req, res){
        /* user.push(producto a agregar) */
        let cartProducts = req.session.userLogged.cart;
        let filteredproducts = [];
        for(let i = 0; i < products.length; i++){
            for(let j = 0; j < cartProducts.length; j++){
                if(products[i].id == cartProducts[j]){
                    filteredproducts.push(products[i]);
                }
            }
        }
        res.render('./products/productCart', { products: filteredproducts } );
    },

    newProduct: function(req, res){
        res.render('./products/newProduct');
    },
    
    newProductFunction: function(req, res){
        Product.create(req.body, req.file.filename)
		res.redirect('/')
    },

    editProduct: function(req, res){
        res.render('./products/editProduct', { product:  Product.findByPk(req.params.id) });
    },

    editProductFunction: function(req, res){  
        Product.update(req.params.id, req.body);
		res.redirect('/')
    },

    deleteProduct: function(req, res){
        Product.delete(req.params.id)
		res.redirect('/')
    }

    

}

module.exports = productController;