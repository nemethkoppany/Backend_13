export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    pictururl: string;
}
export default class Product implements IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    pictururl: string;
    constructor(product: IProduct);
}
