"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Auto = /** @class */ (function () {
    function Auto(init) {
        var _a, _b;
        this.id = (_a = init.id) !== null && _a !== void 0 ? _a : null;
        this.rendszam = init.rendszam;
        this.tipus = init.tipus;
        this.evjarat = init.evjarat;
        this.szin = init.szin;
        this.kep = (_b = init.kep) !== null && _b !== void 0 ? _b : null;
    }
    return Auto;
}());
exports.default = Auto;
