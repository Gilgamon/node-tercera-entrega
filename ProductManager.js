import fs from "fs";

class ProductManager {
  constructor(path) {
      this.path = path
  }
  async getProducts(queryObj) {
    const {limit}= queryObj;
    try {
      if (fs.existsSync(this.path)) {
        const productsFile = await fs.promises.readFile(this.path, 'utf-8')
        const productData = JSON.parse(productsFile)
        return limit ? productData.slice(0, +limit) : productData;
      } else {
        return []
      }}
    catch(error){
      return error
    }}
  async addProduct (product){
    try {
      let {title, description, price, thumbnail, code, stock} = product
        if (!title || !description || !price || !thumbnail || !stock || !code) {
            console.log("Necesitas completar todos los campos")
            return
        }
    let products = await this.getProducts({})

    const id = !products.length ? 1 : products[products.length - 1].id + 1;
    
    const isCodeAlreadyAdded = products.some(prod => prod.code === code);

    isCodeAlreadyAdded
    ? console.log("codigo de producto ya registrado")
    : null;
    const newProduct = {id, ...product}
    products.push(newProduct)
    await fs.promises.writeFile(this.path, JSON.stringify(products))
            console.log('Producto agregado con exito')
          }
    catch (error) {
          console.log(error)
          return error
      }}
    async getProductById(id) {
        try {
            const product = await this.getProducts({})
            const productfind = product.find(p=>p.id===id)
            if(!productfind){
                return 'No se encontro el producto'
            } else {
                return productfind
            }
        } catch (error) {
            return error
        }
      }
      async deleteProductById(id) {
        try {
            const product = await this.getProducts({})
            const newArrayId = product.find(p=>p.id!==id)
            let message = ''
            if (!newArrayId){
              console.log(`El producto con el id: ${id} no existe`)
            }else{
              const newArrayProducts = product.filter(p=> p.id !== id)
            await fs.promises.writeFile(this.path,JSON.stringify(newArrayProducts))
            console.log(`El producto con el id: ${id} fue eliminado con exito`);}
        } catch (error) {
            return error
        }
      }
      async updateProduct(id, update) {
        try { 
          const products = await this.getProducts({})
          const prodIndex = products.findIndex(p=> p.id == id)
          if (prodIndex !== -1) {
            for (const key in update) {
            if (key == "code" && products[prodIndex].code !== update.code) {                        
              const isCodeAlreadyAdded = products.some((prod)=> prod.code === update.code)
              if (isCodeAlreadyAdded) {
                console.log("Cuidado! el producto ya existe")
                return
            }                        
        }
        if (products[prodIndex].hasOwnProperty(key)){
          products[prodIndex][key] = update[key]
        }else{
          console.log('la propiedad que tratas de cambiar no existe dentro de la DB')
          return
      }                                            
  }
  await fs.promises.writeFile(this.path, JSON.stringify(products))
  console.log(`El producto con el id: ${id} fue upgradeado`) }else {
    console.log(`El producto con el id: ${id} no existe`)
}}
catch (error) {
    return error
}
}}

export const manager= new ProductManager("products.json");
/*-----------------------------------------------------------------------------------------*/

//test:
/* async function test() {
  const manager = new ProductManager("products.json") */
 /* await manager.addProduct({
    title: "producto test",
    description: "testeando",
    price: 300,
    thumbnail: "sin imagen",
    code: "abc123",    
    stock: 20});
    await manager.addProduct({
  
    title: "producto test2",
    description: "testeando",
    price: 300,
    thumbnail: "sin imagen",
    code: "abc124",    
    stock: 20
})*/
/* console.log( await manager.getProducts())} */
 
/* //GET PRODUCT BY ID
    console.log(await manager.getProductById(1)) */


/* //DELETE PRODUCT BY ID 
     await manager.deleteProductById(2)
     console.log( await manager.getProducts()) */


/* //UPDATE PRODUCT 
 await manager.updateProduct(1,{        
        title: "Producto Robado",
        description: "Producto en cuarentena",        
        code: "art123"              
    })
    console.log( await manager.getProducts()) */


/* test() */