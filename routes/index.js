const { Router } = require('express')

const ProductsRoute = require('./api/products.router')


const api = Router()

api.use('/products', ProductsRoute)

const home = Router()


home.get('/chats', (req, res) => {
    res.render('chat')
})


home.get('/cart', (req, res) => {
    res.render('cart')
})

module.exports = { home, api }