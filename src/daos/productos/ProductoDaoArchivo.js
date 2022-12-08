//const fs = require('fs')
import fs from 'fs'

//import (fileURLToPath) from 'url';
//const __dirname = fileURLToPath(import.meta.url);

//const {pathname: root} = new URL('productos', import.meta.url)

class ProductoDaoArchivo{
    constructor(){}

    async getProducts(){
        try {
            const products = await fs.promises.readFile(fileURLToPath('file:///C:/path/') + '/products.json')
            return{
                success:true,
                data: JSON.parse(products)
            }
        } catch (err) {
            console.error(err)
            return{
                success:false,
                message:err.message
            }
        }
    }

    async getProduct(uuid){
        try {
            const products = await fs.promises.readFile(__dirname + '/products.json')
            const productsObject = JSON.parse(products)
            const product = productsObject.filter(i => i.uuid ==uuid)
            return{
                success:true,
                data:product[0]
            }
        } catch (err) {
            console.error(err)
            return{
                success:false,
                message:err.message
            }
        }
    }

    async createProduct(data){
        try {
            const products = await fs.promises.readFile(__dirname + '/products.json')
            const productsObject = JSON.parse(products)
            productsObject.push(data)
            await fs.promises.writeFile(__dirname + '/products.json',JSON.stringify(productsObject,null,2))
            return{
                success:true,
                data
            }
        } catch (err) {
            console.error(err)
            return{
                success:false,
                message:err.message
            }
        }
    }

    async updateProduct(uuid,data){
        try {
            const products = await this.getProducts()
            const newList = await products.data.map(i => {
                if(i.uuid == uuid){
                    return {
                        timestamps:data.timestamps,
                        nombre:data.nombre,
                        descripcion:data.descripcion,
                        codigo:data.codigo,
                        imagen:data.imagen,
                        precio:data.precio,
                        stock:data.stock,
                        uuid
                    }
                }
                return i
            })
            await fs.promises.writeFile(__dirname + '/products.json',JSON.stringify(newList,null,2))
            return{
                success:true,
                data:`Product ${uuid} update successFull`
            }
        } catch (err) {
            console.error(err)
            return{
                success:false,
                message:err.message
            }
        }
    }

    async deleteProduct(uuid){
        try {
            const products = await fs.promises.readFile(__dirname + '/products.json')
            const productsObject = JSON.parse(products)
            console.log(productsObject)
            const newProducts = productsObject.filter(i => i.uuid != uuid)
            await fs.promises.writeFile(__dirname + '/products.json',JSON.stringify(newProducts,null,2))
            return{
                success:true,
                data:`Product ${uuid} deleted successFull`
            }
        } catch (err) {
            console.error(err)
            return{
                success:false,
                message:err.message
            }
        }
        
    }
}

export default ProductoDaoArchivo