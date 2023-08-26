const { Router } = require('express')

const ProductsRoute = require('./api/products.router')


const api = Router()

api.use('/', ProductsRoute)

const home = Router()

const prodMng = require('../managers/ProductManager')

home.get('/', async (req, res) => {
    const { page } = req.query;

    const { docs, ...info} = await prodMng.getAllPaged(page);
    // console.log(docs)
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
       info
    })
});

home.get('/product/:id', async (req, res)=> {
    const id = req.params.id;

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


module.exports = { home, api }