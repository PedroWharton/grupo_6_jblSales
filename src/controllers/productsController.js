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
        let newProduct= req.body;
		newProduct.id = products[products.length -1].id + 1;
		newProduct.img = req.file.filename;
        newProduct.price = parseInt(newProduct.price, 10)
        newProduct.unidades = parseInt(newProduct.unidades, 10)
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

        /**update: (req, res)=>{
        let producto = productosController.buscarProducto(req.params.id)
        let actualizacion = req.body;
        for(let propiedad in actualizacion){
            if(propiedad != ""){
                producto[propiedad] = req.body[propiedad];
            }   
        }
        console.log(req.body);
        productos.push(producto)
        fs.writeFileSync(listaProductos, JSON.stringify(productos, null, ' '));
        res.redirect('/product/detail/'+ req.params.id) */
        
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
    }

    

}

module.exports = productController;