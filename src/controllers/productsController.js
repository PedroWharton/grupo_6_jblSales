const express = require('express');
const router = require('../routes/mainRouter');
const path = require('path');
const fs = require('fs');
const { userInfo } = require('os');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController ={
    buscarProducto: function(id){
		let productoFinal;
		let idProducto = id;
		for (let product of products){
			if(idProducto == product.id){
				productoFinal = product;
			}
		}
		return productoFinal
	},
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
        let productd = productController.buscarProducto(req.params.id)
        console.log(this)
        res.render('./products/productDetail', {product: productd });
    },

    productCart: function(req, res){
        res.render('./products/productCart', { /*** pasar productos que el usuario tiene al carrito ***/products } );
    },

    newProduct: function(req, res){
        res.render('./products/newProduct');
    },
    
    newProductFunction: function(req, res){
        let newProduct= req.body;
		newProduct.id = products[products.length -1].id + 1;
		newProduct.img = req.file.filename;
		products.push(newProduct)
		jsonproducts = JSON.stringify(products)
		fs.writeFileSync(productsFilePath, jsonproducts)
		res.render('index', { products }) 
    },

    editProduct: function(req, res){
        res.render('./products/editProduct', { product:  productController.buscarProducto(req.params.id) });
    },
    editProductFunction: function(req, res){
        /*** logica editar json */
        let i = 0;
        let toEditProducts = products
        for(let product of toEditProducts){
            if(req.params.id == product.id){
                toEditProducts[i] = req.body;
                toEditProducts[i].id = req.params.id;
                toEditProducts[i].img = "Logo.png"
            }
            i++;
        }
        let jsonproducts = JSON.stringify(toEditProducts)
		fs.writeFileSync(productsFilePath, jsonproducts)
		res.render('index', { products })
        
    },
    deleteProduct: function(req, res){
        let i = 0;
        for(let product of products){
            if(req.params.id == product.id){
                products.splice(i, 1);
            }
            i++;
        }
        let jsonproducts = JSON.stringify(products, null, ' ')
		fs.writeFileSync(productsFilePath, jsonproducts)
		res.render('index', { products })
    },

    añadirCarrito: function(req, res){
        /*** Funcionalidad que añada el producto al carrito ***/ 
        /* asumo que tengo el id de usuario */
        /* user.push(producto a agregar) */
        let cartProducts;
        for(let product of products){
            if(userInfo.cart.includes(product.id)){
                cartProducts.push(product)
            }
        }
        res.render('./products/productCart', {product: cartProducts})
    }

}

module.exports = productController;