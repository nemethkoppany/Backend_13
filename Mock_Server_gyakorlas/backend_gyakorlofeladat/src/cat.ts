export interface ICat {
    id: number | undefined | null
    name: string,
    breed: string,
    gender: boolean | string,
    age: number | string | null
    picurl: string | null 
}

export default class Cat implements ICat{
     id: number | undefined | null
    name: string = ""
    breed: string = ""
    gender: boolean = false
    age: number  | null = null
    picurl: string | null = null

    constructor(init: ICat){
        Object.assign(this, init as Partial<Cat>)
    }
}