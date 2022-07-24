const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
    let alias = "Users";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING
        },
        cart: {
            type: DataTypes.INTEGER
        },
        admin: {
            type: DataTypes.BOOLEAN
        }
    }
    let config = {
        timestamps: false
    }
    
    const User = sequelize.define(alias, cols, config);

    return User;
}

