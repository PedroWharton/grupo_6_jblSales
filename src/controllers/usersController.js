const express = require('express');
const router = require('../routes/mainRouter');
const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../../database/models')

const usersController ={
    detail: function(req, res){
        let userLogged = req.session.userLogged
        res.render('./user/detail', {user: userLogged})
    },

    login: function(req, res){
        res.render('./user/login');
    },

    loginFunction: function(req, res){
        db.User.findOne({where: {username: req.body.username}}).then(function(userLogged){
            console.log(userLogged.dataValues.user_id);
            if (userLogged){
                let passwordCompare = bcrypt.compareSync(req.body.password, userLogged.dataValues.password)
                console.log(userLogged.dataValues.password);
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
        })
    },

    register: function(req, res){
        res.render('./user/register');
    },

    registerFunction: function(req, res){
        const resultValidation = validationResult(req);

        db.User.findOne({where: {email: req.body.email}}).then(function(mailInDB){
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
            else{
                db.User.findOne({where: {username: req.body.username}}).then(function(usernameInDB){
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
                    else {
                        if(resultValidation.errors.length > 0){
                            res.render('./user/register', {
                                errors: resultValidation.mapped(),
                                oldData: req.body
                            })
                        }
                
                        db.User.create({
                            username: req.body.username,
                            email: req.body.email,
                            avatar: req.file.filename,
                            password: bcrypt.hashSync(req.body.password, 10)
                        }).then(function(){
                            delete req.body.pswRepeat;
                            req.session.userLogged = {
                                ...req.body,
                                avatar: req.file.filename
                            }
                            res.cookie('username', req.body.username, {maxAge: (1000 * 60) * 15})
                            res.redirect('/user/detail')
                        })
                    }
                })

                
            }
        })
        
        

        
                
             
    },

    logout: function(req, res){
        req.session.destroy()
        res.clearCookie('username')
        res.redirect('/')
    },

    añadirCarrito: function(req, res){
        if(!req.session.userLogged){
            res.redirect('/user/login');
        }
        db.UserProducts.create({
            user_id: req.session.userLogged.user_id,
            product_id: req.params.id
        }).then(function(){
            res.redirect('/products/productCart')
        })
        
    }
}

module.exports = usersController;