const express = require('express');
const router = require('../routes/mainRouter');
const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const usersController ={
    login: function(req, res){
        res.render('./user/login');
    },
    register: function(req, res){
        res.render('./user/register.ejs');
    }

}

module.exports = usersController;