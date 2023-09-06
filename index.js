


(async () => {
    require('dotenv').config({path: './.env'})
    const http = require('http')
    const path = require('path')

    const express = require('express')
    const handlebars = require('express-handlebars')
    const cookieParser = require('cookie-parser')
    const session = require('express-session')
    const fileStore = require('session-file-store')
    // const MongoStore = require('connect-mongo')

    const { Server } = require('socket.io')
    const socketManager = require('./socket')

    const mongoose = require('mongoose')
    
    const { home, api } = require('./routes/index')

    try {
        const uri = `mongodb+srv://${process.env.User}:${process.env.Password}@cluster0.n23bk6a.mongodb.net/ecommerce?retryWrites=true&w=majority`
        await mongoose.connect(uri)
        console.log("se a Conectado")

        const app = express()
        const server = http.createServer(app)
        const io = new Server(server)
        const Filestore = fileStore(session)
        

        app.use(express.urlencoded({ extended: true }))
        app.use(express.json())
        app.use('/static', express.static(path.join(__dirname + '/public')))

        app.engine('handlebars', handlebars.engine())
        app.set('views', path.join(__dirname, 'views'))
        app.set('view engine', 'handlebars')

        app.use(cookieParser('esunsecreto'))
       
        // app.use((req, res, next)=> {
        //     res.cookie()
        //     next()
        // })
        app.use(session({
            secret:'esunsecreto',
            resave: true,
            saveUninitialized: true,
            store: new Filestore({path: './session', ttl: 100, retries: 0})
            // store: MongoStore.create({
            //     mongoUrl: uri,
            //     ttl: 60 * 60
            //  })
        }))

        
        app.use('/', home)
        app.use('/api', api)

        app.get('/chats', (req, res) => {
            const user = req.session.user;
            res.render('chat', {
                user: user
            })
        })

        app.use((req, res, next) => {
            req.io = io
            next()
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