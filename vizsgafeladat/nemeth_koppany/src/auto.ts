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

    constructor(init: IAuto) {
        this.id = init.id ?? null;
        this.rendszam = init.rendszam;
        this.tipus = init.tipus;
        this.evjarat = init.evjarat;
        this.szin = init.szin;
        this.kep = init.kep ?? null;
    }
}
