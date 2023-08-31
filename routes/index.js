const { Router } = require('express')

const ProductsRoute = require('./api/products.router')


const api = Router()

api.use('/', ProductsRoute)

const home = Router()

const prodMng = require('../managers/ProductManager')
const CartManager = require('../managers/CartManager')


home.get('/', async (req, res) => {
    const { page } = req.query;
    const user = req.session.user;
    const { docs, ...info} = await prodMng.getAllPaged(page);
   
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
          };
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
          };
    }

    info.prevLink = info.hasPrevPage ? `http://localhost:3000/?page=${info.prevPage}` : '';
    info.nextLink = info.hasNextPage ? `http://localhost:3000/?page=${info.nextPage}` : '';
  

    res.render('products', {
       docs,
       info, 
       user: user
    
    })
});

home.get("/product/:id", async (req,res)=> {
    const id = req.params.id 
    
    if(!id) {
        res.sendStatus(404)
        return
    }

    const { title, price, description, _id } = await prodMng.getById(id)

    res.render('detail', {
        title: title,
        price: price,
        desc: description,
        id: _id
    })
})

home.get('/login', (req, res) => {

    res.render('login')
})

home.post('/login', (req, res)=> {
    const { user } = req.body

    req.session.user = {
        name: user,
        role: "admin"
    }

    req.session.save((err)=> {
        if(!err) {
            res.redirect('/')
        } 
    })
    
})

home.get('/cart', async (req, res)=> {
    const inCart = await CartManager.getAll()
    console.log(inCart)
    const user = req.session.user;

    res.render('cart', {
        inCart, 
        user: user
    })
})


module.exports = { home, api }