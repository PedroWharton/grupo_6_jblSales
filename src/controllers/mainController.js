const path = require('path');
const fs = require('fs');
const db = require('../../database/models');
const { Op } = require('sequelize');

const mainController ={
    index: function(req, res){
        db.Product.findAll().then(function(products){
            res.render('index', { products });
        })
        
    },
    search: function(req, res){
        let qs = req.query.query;
        db.Product.findAll({where: {name: {[Op.like]: '%'+ qs +'%'}}}).then(function(products){
            res.render('./products/products', { products, qs })
        })
		
    }

}

module.exports = mainController;