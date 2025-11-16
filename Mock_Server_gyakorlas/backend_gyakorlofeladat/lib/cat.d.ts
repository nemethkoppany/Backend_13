export interface ICat {
    id: number | undefined | null;
    name: string;
    breed: string;
    gender: boolean | string;
    age: number | string | null;
    picurl: string | null;
}
export default class Cat implements ICat {
    id: number | undefined | null;
    name: string;
    breed: string;
    gender: boolean;
    age: number | null;
    picurl: string | null;
    constructor(init: ICat);
}
