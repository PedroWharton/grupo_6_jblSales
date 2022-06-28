const { create } = require('domain');
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const User = {

    fileName: '../data/usersDataBase.json',

    getData: function(){
        return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    },

    findAll: function(){
        return this.getData();
    },

    generateId: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
            return (lastUser.id + 1);
        }
        return 1;
        
    },

    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id == id);
        return userFound;
    },

    findByField: function(field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },

    create: function(userdata){
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userdata,
            admin: false
        }
        allUsers.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },

    delete: function(id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(user => user.id != id);
        fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, ' '));
        return true;
    }
    
}

module.exports = User;