const express = require("express");
const app = express();
const path = require("path");
const router = require('./routes/mainRouter');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));

app.listen(process.env.PORT || 3000, function(){
    console.log("Servidor corriendo");
})

app.use('/', router);