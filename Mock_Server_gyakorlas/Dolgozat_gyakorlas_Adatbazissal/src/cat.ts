export interface ICat{
    id: number | undefined | null
    name: string,
    breed: string,
    gender: boolean,
    age: number | string | null
    pictururl: string | null
}

export default class Cat implements ICat{
    id: number | undefined | null
    name: string = ""
    breed: string = ""
    gender: boolean = false
    age: number | null = null
    pictururl: string | null = null

    constructor(init: ICat){
        Object.assign(this, init as Partial<Cat>)
    }
}