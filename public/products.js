

console.log("products")

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

const cart = document.querySelector('inCart')
const inCart = ({title, price}) => {
  const div = document.createElement('div')
  div.innerHTML = `
  <h3>${title}</h3>
  <span>${price}</span>
  `

  cart.append(div)
}

socket.on('inCart', ({ title, price })=> {
  inCart({title, price})
})

