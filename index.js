

( async () => {
    const http = require('http')
    const path = require('path')

    const express = require('express')
    const handlebars = require('express-handlebars')
    const app = express()

    const mongoose = require('mongoose')

    try {
        await mongoose.connect("mongodb+srv://federicoiramain:MKpKH09v60kZnbvw@cluster0.n23bk6a.mongodb.net/?retryWrites=true&w=majority")
        console.log("se a Conectado")
    } catch(e) {
        console.log(e)
        console.log("no conectado")
    }
    
    const { Server } = require('socket.io')
    const server = http.createServer(app)
    const io = new Server(server)

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use('/static', express.static(path.join(__dirname + '/public')))

    app.engine('handlebars', handlebars.engine())
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'handlebars')


    app.get('/', (req, res) => {
        res.render('home')
    })

    app.get('/products', (req, res) => {
        res.render('products')
    })

    app.get('/chats', (req, res) => {
        res.render('chat')
    })


    const messages = []
    const users = {}

    io.on('connection', (socket) => {
        console.log(`${socket.id}`)

        socket.emit('event', "hola front")
        socket.on('event', (res) => {
            console.log(res)
        })


        socket.emit('chat-messages', messages)

        socket.on('chat-message', (msg) => {
            messages.push(msg)
            console.log(msg)
            socket.broadcast.emit('chat-message', msg)
        })

        socket.on('user', ({ user }) => {
            users[socket.id] = user
            socket.broadcast.emit('user', { user })
        })

        socket.on('disconnect', () => {
            console.log("disconnected")
        })
    })


    server.listen(3000, () => {
        console.log("ok")
    })
})()
