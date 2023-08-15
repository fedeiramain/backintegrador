
const productsModel = require('../models/product.model')

class ProductManager {

    async getProducts() {
        const productos = await productsModel.find()
        
        return productos
    }

    async create(product) {
        
        const newProduct = await productsModel.create(product)

        return newProduct
    }

    async getById(id) {
        const product = await productsModel.find({ _id: id})

        return product
    }


    async save(id, product) {
        const update = await productsModel.updateOne({_id:id}, product)
       
        return update
    }

    async delete(id) {
       const deleteProduct = await productsModel.deleteOne({_id:id})

       return deleteProduct
    }
}

module.exports = new ProductManager()