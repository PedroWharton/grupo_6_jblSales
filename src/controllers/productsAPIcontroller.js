const db = require('../../database/models');

const productsAPIcontroller ={
    getProducts: function(req,res){
        db.Product.findAndCountAll({
            include: [
                {
                    association: "category"
                }

              ]
            }).then(function(result){
                console.log(result);
            let products = []
            result.rows.map(e => products.push({
                id: e.product_id,
                name: e.name,
                description: e.description,
                categories: [e.category.name],
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
        db.Product.findOne({where: {product_id: req.params.id}},{
            include: [
                {
                    association: "category",
                    where: {'$Category.category_id$': 'Product.category_id'}
                }

              ]
            }).then(function(result){

                console.log(result)
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