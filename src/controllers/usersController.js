const express = require('express');
const router = require('../routes/mainRouter');
const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController ={
    detail: function(req, res){
        let userLogged = req.session.userLogged
        res.render('./user/detail', {user: userLogged})
    },

    login: function(req, res){
        res.render('./user/login');
    },

    loginFunction: function(req, res){
        let userLogged = User.findByField('username', req.body.username);
        
        console.log(req.body)
        if (userLogged){
            let passwordCompare = bcrypt.compareSync(req.body.password, userLogged.password)
            if(passwordCompare){
                delete userLogged.password;
                req.session.userLogged = userLogged;
                if(req.body.remember){
                    res.cookie('username', req.body.username, {maxAge: (1000 * 60) * 15})
                }
                res.redirect('/user/detail')
            }
            else{
                res.render('./user/login', {
                    errors: {
                        username: {
                            msg: "Las credenciales son invalidas"
                        }
                    }
                })
                res.render('./user/login', {
                    errors: {
                        username: {
                            msg: "No se encuentra este usuario registrado"
                        }
                    }
                })
            }
            
        }

        
    },

    register: function(req, res){
        res.render('./user/register');
    },

    registerFunction: function(req, res){
        const resultValidation = validationResult(req);


        let mailInDB = User.findByField('email', req.body.email);
        let usernameInDB = User.findByField('username', req.body.username);

        if(resultValidation.errors.length > 0){
            res.render('./user/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        
        if(mailInDB){
            return res.render('./user/register', {
                errors: {
                    email:{
                        msg: "Este mail ya esta en uso"
                    }
                },
                oldData: req.body
            })
        }
        if(usernameInDB){
            return res.render('./user/register', {
                errors: {
                    username:{
                        msg: "Este nombre de usuario ya esta en uso"
                    }
                },
                oldData: req.body
            })
        }

        delete req.body.pswRepeat;
        let userToCreate = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password),
            avatar: req.file.filename,
            cart: []
        }
        User.create(userToCreate)
		delete userToCreate.password;
                req.session.userLogged = userToCreate;
                res.cookie('username', req.body.username, {maxAge: (1000 * 60) * 15})
                res.redirect('/user/detail')
             
    },

    logout: function(req, res){
        res.clearCookie('username')
        req.session.destroy();
        res.redirect('/')
    },

    añadirCarrito: function(req, res){
        if(!req.session.userLogged){
            res.redirect('/user/login');
        }

        let cartProducts = req.session.userLogged.cart;
        let newCart = [];
        
        for(let product of products){
            for(let i = 0; i < cartProducts.length; i++){
                if(req.params.id == product.id || product.id == cartProducts[i]){
                    newCart.push(product)
                }
            }
        }
        let allUsers = User.findAll()
        let usertoedit = allUsers.find(oneUser => oneUser.id == req.session.userLogged.id);
        usertoedit.cart.push(parseInt(req.params.id, 10))
        fs.writeFileSync(usersFilePath, JSON.stringify(allUsers, null, ' '));
        
        res.redirect('/products/productCart')
    }
}

module.exports = usersController;