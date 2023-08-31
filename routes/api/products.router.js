const { Router } = require('express')
const productManager = require('../../managers/ProductManager')


const routes = Router()

routes.get("/", async (req, res)=> {
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


routes.post("/", async (req, res) => {
    const { body } = req

    const product = await productManager.create(body)

    res.send({status: "cargado con exito", product: product })
})

routes.put("/:id", async (req, res) => {
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

routes.delete("/:id", async (req, res) => {
    const { id } = req.params
    if (!await productManager.getById(id)) {
        res.sendStatus(404)
        return
    } else {
        const deleted = await productManager.delete(id)

        req.sendStatus(202).send(deleted)
    }

})

module.exports = routes