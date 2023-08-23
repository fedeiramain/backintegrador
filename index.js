

(async () => {
    require('dotenv').config()
    const http = require('http')
    const path = require('path')

    const express = require('express')
    const handlebars = require('express-handlebars')
    
    const { Server } = require('socket.io')
    const mongoose = require('mongoose')
    
    const chatMsg = require('./managers/ChatManager')
    const prodMng = require('./managers/ProductManager')


    try {
        const uri = `mongodb+srv://${process.env.User}:${process.env.Password}@cluster0.n23bk6a.mongodb.net/ecommerce?retryWrites=true&w=majority`
        await mongoose.connect(uri)
        console.log("se a Conectado")

        const app = express()
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

        app.get('/products', async (req, res) => {
            res.render('products')
        })

        app.get('/chats', (req, res) => {
            res.render('chat')
        })


        io.on('connection', async (socket) => {
            console.log(`${socket.id}`)

            socket.emit('event', "hola front")
            socket.on('event', (res) => {
                console.log(res)
            })

            const messages = await chatMsg.getAll()
            socket.emit('chat-messages', messages)

            socket.on('chat-message', async (msg) => {
                messages.push(msg)
                console.log(msg)
                await chatMsg.create(msg)
                socket.broadcast.emit('chat-message', msg)
            })

            let users = {}

            socket.on('user', ({ user }) => {
                users[socket.id] = user
                socket.broadcast.emit('user', { user })
            })
            
            const { docs, ...info} = await prodMng.getAllPaged()
            console.log(docs)
            socket.emit('prod', { docs, ...info})

            socket.on('disconnect', () => {
                console.log("disconnected")
            })
        })


        server.listen(3000, () => {
            console.log("ok")
        })
    } catch (e) {
        console.log(e)
        console.log("no conectado")
    }

})()