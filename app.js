const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("public"));
const publicPath = path.resolve(__dirname, "./public")

app.listen(process.env.PORT || 3000, function(){
    console.log("Servidor corriendo");
})

app.get("/", function(req, res){
    res.sendFile(path.resolve(__dirname, "./views/index.html"))
})

app.get("/login", function(req, res){
    res.sendFile(path.resolve(__dirname, "./views/login.html"))
})

app.get("/register", function(req, res){
    res.sendFile(path.resolve(__dirname, "./views/register.html"))
})

app.get("/productDetail", function(req, res){
    res.sendFile(path.resolve(__dirname, "./views/productDetail.html"))
})

app.get("/productCart", function(req, res){
    res.sendFile(path.resolve(__dirname, "./views/productCart.html"))
})