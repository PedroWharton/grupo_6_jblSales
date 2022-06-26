const express = require('express');
const router = require('../routes/mainRouter');
const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController ={
    login: function(req, res){
        res.render('./user/login');
    },
    register: function(req, res){
        res.render('./user/register');
    },

    registerFunction: function(req, res){
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
            res.render('./user/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        else{
            let newUser= req.body;
		newUser.id = users[users.length -1].id + 1;
		newUser.avatar = "Logo.png";
        newUser.admin = false;
		users.push(newUser)
        console.log(users)
		let jsonUsers = JSON.stringify(users)
		fs.writeFileSync(usersFilePath, jsonUsers)
		res.render('index', { products })
        }     
    }
}

module.exports = usersController;