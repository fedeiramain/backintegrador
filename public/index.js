
console.log("hola")
const socket = io()

socket.on('event', (res)=> {
    console.log(res)

    socket.emit('event', "hola Back")
})

const chatRoom = document.querySelector('#conversation')
const inputElement = document.querySelector('#input')

chatRoom.innerHTML = ""

const appendMsg = (user, time, msg) => {
  const div = document.createElement('div')
  div.classList.add('uk-width-1-1')
  div.innerHTML = 
  `<h3 class="user">${user} <span class="time">${time}</span></h3>
  <p class="msg">${msg}</p>
  `
  
  chatRoom.appendChild(div)
}

const appendUser = (user) => {
  const div = document.createElement('div')
  div.innerHTML = `<span class="user">${user}</span>`

  chatRoom.appendChild(div)
}


let username = null
let currentMessages = []

socket.on('chat-messages', (messages) => {
  currentMessages = messages
  console.log(currentMessages)

})

Swal.fire({
  title: 'Ingresa tu nombre',
  input: 'text',
  inputAttributes: {
    autocapitalize: 'off'
  },
  confirmButtonText: 'Enviar',
  preConfirm: (username) => {
    if (!username) {
      Swal.showValidationMessage(
        `El usuario no puede estar en blanco`
      )
      return
    }
    
    return username
  },
  allowOutsideClick: false
}).then(({ value }) => {
  username = value
  socket.emit('user', { user: username })

  for (const { user, datetime, text } of currentMessages) {

    appendMsg(user, datetime, text)
  }

  socket.on('chat-message', ({ user, datetime, text }) => {

    appendMsg(user, datetime, text)
  })

  socket.on('user', ({ user }) => {
    appendUser(user)
  })


  inputElement.addEventListener('keyup', ({ key, target }) => {
    if (key !== 'Enter') {
      return
    }

    const { value } = target

    if (!value) {
      return
    }

    const fecha = new Date()
    const msg = { user: username, datetime: fecha.toLocaleTimeString('en-US'), text: value }

    socket.emit('chat-message', msg)
    target.value = ""
    appendMsg(username, fecha.toLocaleTimeString('en-US'), value)
  })
})