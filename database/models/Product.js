let User = require('./User')
module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        product_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        img: {
            type: dataTypes.STRING
        },
        name: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.INTEGER
        },
        description: {
            type: dataTypes.STRING
        },
        caracteristics: {
            type: dataTypes.STRING
        },
        category: {
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: "products",
        timestamps: false
    }
    
    const Product = sequelize.define(alias, cols, config);

    /*Product.associate = function(models){
        Product.belongsToMany(models.User, {
            as: "users",
            through: "users_products",
            foreingKey: "product_id",
            otherKey: "user_id",
            timestamps: false
        })
    }*/

    return Product;
}

