const getProductModule = async () => {
    const datacore = process.env.DATACORE
    //console.log(datacore)
    if(datacore == 'memoria'){
        const ModuleSource = await import('./productos/ProductoDaoMemoria.js')
        return ModuleSource.default
    }else if(datacore == 'file'){
        //const ModuleSource = await import('./daos/productos/ProductoDaoArchivo')
        const ModuleSource = await import('./productos/ProductoDaoArchivo.js')
        return ModuleSource.default
    }
}

const ProductService = async () => {
    const ProductoDaoArchivo = await getProductModule()
    //console.log(ProductoDaoArchivo)
    const productService = new ProductoDaoArchivo()
    console.log(await productService.getProducts())
}

export default ProductService