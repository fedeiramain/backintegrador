const { error } = require('console')
const fs = require('fs/promises')
const path = require('path')

class ProductManager {

    constructor(filename) {
        this.filename = filename
        this.filepath = path.join(__dirname,'../data', this.filename)
        
    }

    async getProducts() {
        const data = await fs.readFile(this.filepath, "utf-8")
        const productos = JSON.parse(data)

        return productos
    }

    #prodcuts = []
    #readFile = async ()=> {
        const data = await fs.readFile(this.filepath, "utf-8")
        this.#prodcuts = JSON.parse(data)
    }
    #writeFile = async ()=> {
        const data = JSON.stringify(this.#prodcuts, null,2)
        await fs.writeFile(this.filepath, data)
    }

    async getAll() {
        await this.#readFile()
        return this.#prodcuts
    }

    async create(product) {
        await this.#readFile()

        const id = new Date().getTime()
        const newProduct = {
            id,
            ...product
        }

        this.#prodcuts.push(newProduct)

        await this.#writeFile()

        return newProduct
    }

    async getById(id) {
        await this.#readFile()

        return this.#prodcuts.find(p => p.id == id)
    }

    inProductos(idProduct) {
        if(this.getById(idProduct)) {
            return this.#prodcuts.filter(p => p.id == idProduct)
        } else {
            throw Error("id not found")
        }
    }

    async save(id, product) {
        await this.#readFile()
        const exist = await this.getById(id)

        if(!exist) {
            return new error("el id no existe")
        } else {
            const {
                title,
                description,
                price,
                img,
                stock,
                code,
                status,
                thumbnails
            } = product
    
            exist.title = title
            exist.description = description
            exist.price = price
            exist.img = img
            exist.stock = stock
            exist.code = code
            exist.status = status
            exist.thumbnails = thumbnails
    
            await this.#writeFile()
        }

       
    }

    async delete(id) {
       await this.#readFile()
        this.#prodcuts = this.#prodcuts.filter(p => p.id != id)
       await this.#writeFile()
    }
}

module.exports = ProductManager