const { Router } = require('express')
const ProductManager = require('../managers/ProductManager')
const productModel = require('../models/product.model')

const productManager = new ProductManager('products.json')

const router = Router()

router.get("/", async (req, res)=> {
    const {search, min, max, limit} = req.query
    // const datos = await productManager.getAll()
    const datos = await productModel.find()
    let filtrados = datos


    if(search) {
        filtrados = filtrados.filter(p => p.title.includes(search) || p.code.includes(search))
    }

    if(min || max) {
        filtrados = filtrados.filter(p => p.price >= (+min || 1) && p.price <= (+max || Infinity))
    }

    if(limit) {
        filtrados = filtrados.slice(0, +limit)
    }

    res.send(filtrados)
})

router.get("/:id", async (req,res)=> {
    const id = req.params.id 
    // const datos = await productManager.getProducts(id)
    const datos = await productModel.findOne({ _id: id })
    
    let productos = datos

    if(isNaN(id)){
        res.send({status: "(id) debe ser Number"})
    }
    if(productos = productos.filter(p => p.id == id)) {
        res.send(productos)
    } else {
        res.send({status: "(id) no existe el producto"})
    }
    return
})

router.post("/", async (req, res) => {
    const { body } = req

    const product = await productManager.create(body)

    res.send({status: "cargado con exito", product: product })
})

router.put("/:id", async (req, res) => {
    const { body } = req
    const id = req.params.id

    if (!await productManager.getById(id)) {
        res.sendStatus(404)
        return
    } else {
        const product = await productManager.save(id, body)

        res.sendStatus(202).send(product)
    }

})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    if (!await productManager.getById(id)) {
        res.sendStatus(404)
        return
    } else {
        const deleted = await productManager.delete(id)

        req.sendStatus(202).send(deleted)
    }

})

module.exports = router