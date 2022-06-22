const express = require('express');
const router = require('../routes/mainRouter');
const path = require('path')

const mainController ={
    index: function(req, res){
        res.render('index');
    },
    login: function(req, res){
        res.render('./user/login');
    },
    register: function(req, res){
        res.render('./user/register.ejs');
    },
    productDetail: function(req, res){
        res.render('./products/productDetail');
    },
    productCart: function(req, res){
        res.render('./products/productCart');
    },

    newProduct: function(req, res){
        res.render('./products/newProduct.ejs');
    },
    editProduct: function(re, res){
        let producto = {
            img: '/images/JBLQuantum50.png',
            titulo: 'PARLANTE',
            precio: 999,
            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo reiciendis cum assumenda error obcaecati, dicta atq',
            caracteristicas: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo reiciendis cum assumenda error obcaecati, dicta atq',
            cantidad: 3,
            categoria:"parlante"
        }
        res.render('editProduct', { producto: producto});
    }

}

module.exports = mainController;