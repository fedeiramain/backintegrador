
console.log("hola")
const socket = io()

socket.on('event', (res)=> {
    console.log(res)

    socket.emit('event', "hola Back")
})


