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
            if (userLogged){
                let passwordCompare = bcrypt.compareSync(req.body.password, userLogged.dataValues.password)
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
                }
            }
            else{
                res.render('./user/login', {
                    errors: {
                        username: {
                            msg: "Las credenciales son invalidas"
                        }
                    }
                })
            }
        })
        .catch(function(error){
            res.send(error)
        }
        )
    },

    register: function(req, res){
        res.render('./user/register');
    },

    registerFunction: function(req, res){
        const resultValidation = validationResult(req);

        function isImage(filename) {

            let extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg':
                    return true
                case '.jpeg':
                    return true
                case  '.png':
                    return true
                case  '.gif':
                    return true    
                default:
                    return false;
            }
        }

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
                        else if (!isImage(req.file.filename)){
                            return res.render('./user/register', {
                                errors: {
                                    avatar:{
                                        msg: "Ingrese una imagen en formato valido"
                                    }
                                },
                                oldData: req.body
                            })
                        }
                        else{
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
                
                    }
                })

                
            }
        })
        
        

        
                
             
    },

    logout:  function(req, res){
        req.session.destroy()
        res.clearCookie('username')
        res.redirect('/')
    },

    añadirCarrito: function(req, res){
        console.log('entre');
        if(!req.session.userLogged){
            res.redirect('/user/login');
        }
        db.UserProducts.create({
            user_id: req.session.userLogged.user_id,
            product_id: req.params.id
        }).then(function(){
            res.redirect('/products/productCart')
        })
        
    },
    edit: function(req, res){
        res.render('./user/edit', {user: req.session.userLogged})
    },

    editFunction: function(req, res){
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        db.User.update(req.body, {where: {user_id: req.params.id}})
        .then(function(ok){
            if(ok){
                db.User.findOne({ where: {user_id: req.params.id} })
                .then(function(user){
                    res.render('./user/detail', {user})
                })
            }
        })
        
    },

    deleteFromCart: function(req, res){
        db.UserProducts.destroy({where: {
            user_id: req.session.userLogged.user_id,
            product_id: req.params.id
        }}).then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length
                    },
                    data:confirm
                }
            }
        })    
        .catch(error => res.send(error))
    }
}

module.exports = usersController;
