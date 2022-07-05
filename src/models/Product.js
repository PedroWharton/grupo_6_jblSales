const { create } = require('domain');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const User = {

    fileName: '../data/productsDataBase.json',

    getData: function(){
        return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    },

    findAll: function(){
        return this.getData();
    },

    generateId: function(){
        let allProducts = this.findAll();
        let lastProduct = allProducts.pop();
        if(lastProduct){
            return (lastProduct.id + 1);
        }
        return 1;
        
    },

    findByPk: function(id){
        let allProducts = this.findAll();
        let productFound = allProducts.find(product => product.id == id);
        return productFound;
    },

    findByField: function(field, text){
        let allProducts = this.findAll();
        let productFound = allProducts.find(product => product[field] === text);
        return productFound;
    },

    create: function(productData){
        let allProducts = this.findAll();
        let newProduct = {
            id: this.generateId(),
            ...productData
        }
        allProducts.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(allProducts, null, ' '));
        return newProduct;
    },

    update: function(editedProduct){
        let allProducts = this.findAll();
        let productFound = allProducts.find(product => product.id == editedProduct.id);
        for(let i = 0; i < allProducts.length; i++){
            if( allProducts[i] == productFound){
                allProducts[i] = editedProduct
                break
            }
        }
        fs.writeFileSync(productsFilePath, JSON.stringify(allProducts, null, ' '));
        return editedProduct;
    },

    delete: function(id){
        let allProducts = this.findAll();
        let finalProducts = allProducts.filter(product => product.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
        return true;
    }
    
}

module.exports = User;