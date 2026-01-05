"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Auto {
    constructor(init) {
        this.id = init.id ?? null;
        this.rendszam = init.rendszam;
        this.tipus = init.tipus;
        this.evjarat = init.evjarat;
        this.szin = init.szin;
        this.kep = init.kep ?? null;
    }
}
exports.default = Auto;
