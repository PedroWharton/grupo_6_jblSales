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
            let products = []
            result.rows.map(e => products.push({
                id: e.product_id,
                name: e.name,
                description: e.description,
                categories: [e.category.name],
                price: e.price,
                image: `localhost:3000/images/${e.img}`,
                detail: `localhost:3000/api/products/${e.product_id}`
            }))
            const response = {
                data: {
                    count: result.count,
                    products: products
                }
            } 
            res.json(response)
        }).catch(function(err){
            console.log(err);
        })
    },
    productDetail: function(req,res){
        db.Product.findByPk(req.params.id,{
            include: [
                {
                    association: "category"
                }
              ]
            }).then(function(result){
                let product = {
                    id: result.product_id,
                    name: result.name,
                    description: result.description,
                    category: result.category.name,
                    image: `localhost:3000/images/${result.img}`
                }
            const response = {
                data: {
                    product: product
                }
            } 
            res.json(response)
        }).catch(function(err){
            console.log(err)
        })
    }

}

module.exports = productsAPIcontroller;