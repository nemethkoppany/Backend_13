export interface IAuto {
    id?: number | null;
    rendszam: string;
    tipus: string;
    evjarat?: number;
    szin: string;
    kep?: string | null;
}
export default class Auto implements IAuto {
    id?: number | null;
    rendszam: string;
    tipus: string;
    evjarat?: number;
    szin: string;
    kep?: string | null;
    constructor(init: IAuto);
}
