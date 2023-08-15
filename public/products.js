console.log("products")


socket.on('products', (res) => {
    console.log(res)

    socket.emit('products', "hola products")
})

const products = document.querySelector('#products')

products.innerHTML = ""

const addProducts = (prod) => {
    console.log(prod)
    {prod && prod.forEach(p => {
        const div = document.createElement('div')
        div.classList.add('product')
        div.innerHTML = `
        <h3 class="name-product">${p.title}</h3>
        <p class="desc-product">${p.description}</p>
        <span class="precio-product">${p.price}</span>
        <button onclick="addToCart()" class="">Agregar al carrito</button>
    `
     products.append(div)
    })}
   
}

socket.on('prod', (prod) => {
    addProducts(prod)
})