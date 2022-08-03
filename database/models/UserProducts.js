let User = require('./User')
let Product = require('./Product')
module.exports = (sequelize, dataTypes) => {
    let alias = "UserProducts";
    const UserProduct = sequelize.define(alias,{
        users_products_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        product_id: {
            type: dataTypes.INTEGER,
            references: {
                model: 'Product',
                key: 'id'
            }
        }
    }, {
        tableName: 'users_products',
        timestamps: false
    });
    
    User.association = function(models){
        UserProduct.belongsTo(models.User, {foreignKey:'user_id'})
        UserProduct.belongsTo(models.Product, {foreignKey:'product_id'})

    }
    
    return UserProduct;
}