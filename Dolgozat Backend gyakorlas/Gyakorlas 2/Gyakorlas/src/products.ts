export interface IProduct {
    id: number
    name: string
    description: string
    price: number
    stock: number
    pictururl: string
  }
  
  export default class Product implements IProduct {
    id: number
    name: string
    description: string
    price: number
    stock: number
    pictururl: string
  
    constructor(product: IProduct) {
      this.id = product.id
      this.name = product.name
      this.description = product.description
      this.price = product.price
      this.stock = product.stock
      this.pictururl = product.pictururl
    }
  }
  