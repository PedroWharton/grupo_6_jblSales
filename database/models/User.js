let Product = require('./Product')
module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        user_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        avatar: {
            type: dataTypes.STRING
        },
        admin: {
            type: dataTypes.BOOLEAN
        }
    }
    let config = {
        tableName: "users",
        timestamps: false
    }
    
    const User = sequelize.define(alias, cols, config);

    /*User.associate = function(models){
        User.belongsToMany(models.Products, {
            as: "products",
            through: "users_products",
            foreingKey: "user_id",
            otherKey: "product_id",
            timestamps: false
        })
    }*/

    return User;
}

