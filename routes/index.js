const { Router } = require('express')

const ProductsRoute = require('./api/products.router')


const api = Router()

api.use('/', ProductsRoute)

const home = Router()

const prodMng = require('../managers/ProductManager')

home.get('/products', async (req, res) => {
    const { page } = req.query
    const { docs, ...info} = await prodMng.getAllPaged(page)
    let resp;
    if(docs) {
        resp = {
            status: 'success',
            payload: docs,
            totalPages: info.totalPages,
            prevPage: info.prevPage,
            nextPage: info.nextPage,
            page: info.page,
            hasPrevPage: info.hasPrevPage,
            hasNextPage: info.hasNextPage,
          }
    } else {
        resp = {
            status: 'error',
            payload: null,
            totalPages: null,
            prevPage: null,
            nextPage: null,
            page: null,
            hasPrevPage: null,
            hasNextPage: null,
          }
    }

    console.log(info)

    info.prevLink = info.hasPrevPage ? `http://localhost:3000/products/?page=${info.prevPage}` : ''
    info.nextLink = info.hasNextPage ? `http://localhost:3000/products/?page=${info.nextPage}` : ''
    // console.log(info)
   
    res.render('products', {
       docs,
       info
    })
})

home.get('/chats', (req, res) => {
    res.render('chat')
})


home.get('/cart', (req, res) => {
    res.render('cart')
})

module.exports = { home, api }