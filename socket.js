const chatMsg = require('./managers/ChatManager')
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
    
    // const { docs, ...info} = await prodMng.getAllPaged()
    // console.log(docs)
    // socket.emit('prod', { docs, ...info})


    socket.on('disconnect', () => {
        console.log("disconnected")
    })
}

module.exports = socketManager