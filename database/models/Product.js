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
        category_id: {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tableName: "products",
        timestamps: false
    }
    
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.belongsToMany(models.User, {
            as: "users",
            through: "users_products",
            foreignKey: "product_id",
            otherKey: "user_id",
            timestamps: false
        }),
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        })
    }

    return Product;
}

