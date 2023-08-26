const { Router } = require('express')
const productManager = require('../../managers/ProductManager')


const routes = Router()

// routes.get('/', async(req, res) => {
//     const { page = 1, size = 4 } = req.query
//   const product = await productManager.getAllPaged()
//   console.log(product)

//   pageInfo.prevLink = pageInfo.hasPrevPage ? `http://localhost:3000/?page=${pageInfo.prevPage}&size=${size}` : ''
//   pageInfo.nextLink = pageInfo.hasNextPage ? `http://localhost:3000/?page=${pageInfo.nextPage}&size=${size}` : ''

//   res.render('products', {
//     products,
//     title: "hola"
//   })
// })



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

routes.get("/:id", async (req,res)=> {
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
        const product = await ProductManager.save(id, body)

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