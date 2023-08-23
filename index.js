

(async () => {
    require('dotenv').config()
    const http = require('http')
    const path = require('path')

    const express = require('express')
    const handlebars = require('express-handlebars')
    
    const { Server } = require('socket.io')
    const mongoose = require('mongoose')
    
    const prodMng = require('./managers/ProductManager')

    try {
        const uri = `mongodb+srv://${process.env.User}:${process.env.Password}@cluster0.n23bk6a.mongodb.net/ecommerce?retryWrites=true&w=majority`
        await mongoose.connect(uri)
        console.log("se a Conectado")

        const app = express()
        const server = http.createServer(app)
        const io = new Server(server)
        const socketManager = require('./socket')

        app.use(express.urlencoded({ extended: true }))
        app.use(express.json())
        app.use('/static', express.static(path.join(__dirname + '/public')))

        app.engine('handlebars', handlebars.engine())
        app.set('views', path.join(__dirname, 'views'))
        app.set('view engine', 'handlebars')

        app.get('/', (req, res) => {
            res.render('home')
        })

        app.get('/products', async (req, res) => {
            const { page } = req.query
            const { docs, ...info} = await prodMng.getAllPaged(page)

            info.prevLink = info.hasPrevPage ? `http://localhost:3000/products/?page=${info.prevPage}` : ''
            info.nextLink = info.hasNextPage ? `http://localhost:3000/products/?page=${info.nextPage}` : ''
            console.log(info)
            res.render('products', {
               docs,
               info
            })
        })

        app.get('/chats', (req, res) => {
            res.render('chat')
        })


        io.on('connection', socketManager)


        server.listen(3000, () => {
            console.log("ok")
        })
    } catch (e) {
        console.log(e)
        console.log("no conectado")
    }

})()