console.log("products")
socket.on('products', (res) => {
    console.log(res)
    socket.emit('products', "hola products")
})


const products = document.querySelector('#products')

function addCart() {
    const addButton = document.querySelectorAll('.addbutton')

    addButton.forEach(p => {p.addEventListener('click', (e) => {
        const pid = e.target.id
        console.log(pid)
        socket.emit('addCart', pid)
      })})
  
}

addCart()
