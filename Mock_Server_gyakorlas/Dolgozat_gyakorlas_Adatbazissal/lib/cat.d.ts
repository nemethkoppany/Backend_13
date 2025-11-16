export interface ICat {
    id: number | undefined | null;
    name: string;
    breed: string;
    gender: boolean;
    age: number | string | null;
    pictururl: string | null;
}
export default class Cat implements ICat {
    id: number | undefined | null;
    name: string;
    breed: string;
    gender: boolean;
    age: number | null;
    pictururl: string | null;
    constructor(init: ICat);
}
