const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("public"));
const publicPath = path.resolve(__dirname, "./public")

app.listen(3000, function(){
    console.log("Servidor corriendo");
})

app.get("/", function(req, res){
    res.sendFile(path.resolve(__dirname, "./views/index.html"))
})