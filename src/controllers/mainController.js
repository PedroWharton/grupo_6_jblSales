const express = require('express');
const router = require('../routes/mainRouter');

const mainController ={
    index: function(req, res){
        res.render('index');
    },
    login: function(req, res){
        res.render('login');
    },
    register: function(req, res){
        res.render('register');
    },
    productDetail: function(req, res){
        res.render('productDetail');
    },
    productCart: function(req, res){
        res.render('productCart');
    },

    newProduct: function(req, res){
        res.render('newProduct');
    },

}

module.exports = mainController;