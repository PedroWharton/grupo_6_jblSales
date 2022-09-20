const db = require('../../database/models');

const productsAPIcontroller ={
    getProducts: function(req,res){
        db.Product.findAndCountAll().then(function(result){
            let products = []
            result.rows.map(e => products.push({
                id: e.product_id,
                name: e.name,
                description: e.description,
                relaciones: [],
                detail: `loalhost:300/api/products/${e.product_id}`
            }))
            const response = {
                data: {
                    count: result.count,
                    products: products
                }
            } 
            res.json(response)
        })  
    },
    productDetail: function(req,res){
        db.Product.findOne({where: {product_id: req.params.id}}).then(function(result){
            let product = {
                id: result.product_id,
                name: result.name,
                description: result.description,
                image: `localhost:3000/images/${result.img}`
            }
            const response = {
                data: {
                    product: product
                }
            } 
            res.json(response)
        })  
    }

}

module.exports = productsAPIcontroller;