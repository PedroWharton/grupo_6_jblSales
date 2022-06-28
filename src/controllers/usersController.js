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
        console.log(req.cookies.testing)
        res.render('./user/login');
    },

    loginFunction: function(req, res){
        let userLogged = User.findByField('username', req.body.username);
        if (userLogged){
            let passwordCompare = bcrypt.compareSync(req.body.password, userLogged.password)
            if(passwordCompare){
                delete userLogged.password;
                req.session.userLogged = userLogged;
                res.cookie('username', req.body.username, {maxAge: (1000 * 60) * 2})
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
        
        res.cookie('testing', "hola mundo", {maxAge: 1000 * 30})
        res.render('./user/register');
    },

    registerFunction: function(req, res){
        const resultValidation = validationResult(req);

        let mailInDB = User.findByField('email', req.body.email);
        let usernameInDB = User.findByField('username', req.body.username);

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
        if(resultValidation.errors.length > 0){
            res.render('./user/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        delete req.body.pswRepeat;
        let userToCreate = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password),
            avatar: 'Logo.png',
            cart: []
        }
        User.create(userToCreate)
		res.render('index', { products })
             
    },

    logout: function(req, res){
        res.clearCookie('username')
        req.session.destroy();
        res.redirect('/')
    }
}

module.exports = usersController;