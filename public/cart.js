socket.on('inCart', (prod) => {
    cartProducts(prod)
})
k
const cart = document.querySelector('#cart')

products.innerHTML = ""

const cartProducts = (prod) => {
    console.log(prod)
    {prod && prod.forEach(p => {
        const div = document.createElement('div')
        div.classList.add('product')
        div.innerHTML = `
        <h3 class="name-product">${p.title}</h3>
        <p class="desc-product">${p.description}</p>
        <span class="precio-product">${p.price}</span>
        <button onclick="addToCart(${p.id})" class="">Agregar al carrito</button>
    `
     cart.append(div)
    })}
   
}