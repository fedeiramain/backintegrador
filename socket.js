const CartManager = require('./managers/CartManager')
const chatMsg = require('./managers/ChatManager')
const ProductManager = require('./managers/ProductManager')
// const prodMng = require('./managers/ProductManager')

async function socketManager(socket) {
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

    // socket.on('addCart', async (res)=> {
    //     // console.log(res)
    //     const prodAdd = await ProductManager.getById(res)
    //     socket.emit('inCart', prodAdd)
    //     console.log(title)

    //     // const newCart = await CartManager.createCart("Fede")
        
    // })
    socket.on('disconnect', () => {
        console.log("disconnected")
    })
}

module.exports = socketManager