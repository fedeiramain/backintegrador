console.log("products")


socket.on('products', (res) => {
    console.log(res)

    socket.emit('products', "hola products")
})

const products = document.querySelector('#products')

 function addToCart(res) {
 console.log(res)
}

// products.innerHTML = ""

// const addProducts = ({ docs, ...info}) => {
//     console.log(docs)
//     console.log(info)
//     const prevPage = info.hasPrevPage ? `http://localhost:3000/products/?page=${info.prevPage}` : ''
//     console.log(prevPage)
//     const nextPage = info.hasNextPage ? `http://localhost:3000/products/?page=${info.nextPage}` : ''
//     console.log(nextPage)
//     {docs && docs.forEach(p => {
//         const div = document.createElement('div')
//         div.classList.add('product')
//         div.innerHTML = `
//         <h3 class="name-product">${p.title}</h3>
//         <p class="desc-product">${p.description}</p>
//         <span class="precio-product">${p.price}</span>
//         <button onclick="addToCart(${p.id})" class="">Agregar al carrito</button>
//     `
//      products.append(div)
//     })}
   
// }

// socket.on('prod', ({ docs, ...info}) => {
//     addProducts({ docs, ...info})
// })

