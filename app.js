const express = require("express");
const app = express();
const path = require("path");
const render = express.Render;

app.set('view engine', 'ejs');

app.use(express.static("public"));
const publicPath = path.resolve(__dirname, "./public")

app.listen(process.env.PORT || 3000, function(){
    console.log("Servidor corriendo");
})

app.get("/", function(req, res){
    res.render('index')
})

app.get("/login", function(req, res){
    res.render('login')
})

app.get("/register", function(req, res){
    res.render('register')
})

app.get("/productDetail", function(req, res){
    res.render('productDetail')
})

app.get("/productCart", function(req, res){
    res.render('productCart')
})