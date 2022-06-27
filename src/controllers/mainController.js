const express = require('express');
const router = require('../routes/mainRouter');
const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController ={
    index: function(req, res){
        res.render('index', { products });
    },
    search: function(req, res){
        let qs = req.query.query;
		console.log(qs)
		let busqueda = [];
		for(let product of products){
			if(product.name.includes(qs) || product.description.includes(qs)){
				busqueda.push(product);
			}
		}
        res.render('./products/products', { products: busqueda, qs })
    }

}

module.exports = mainController;