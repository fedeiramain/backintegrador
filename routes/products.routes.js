const { Router } = require('express')
const productManager = require('../managers/ProductManager')


const router = Router()

router.get("/products", async (req, res)=> {
    const {search, min, max, limit} = req.query
    // const datos = await productManager.getAll()
    const datos = await productManager.getProducts()
    let filtrados = datos
    console.log(filtrados)

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

router.get("/products/:id", async (req,res)=> {
    const id = req.params.id 
    // const datos = await productManager.getProducts(id)
    const datos = await productManager.getById(id)
    
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

router.post("/products/", async (req, res) => {
    const { body } = req

    const product = await productManager.create(body)

    res.send({status: "cargado con exito", product: product })
})

router.put("/products/:id", async (req, res) => {
    const { body } = req
    const id = req.params.id

    if (!await productManager.getById(id)) {
        res.sendStatus(404)
        return
    } else {
        const product = await ProductManagerroductManager.save(id, body)

        res.sendStatus(202).send(product)
    }

})

router.delete("/products/:id", async (req, res) => {
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