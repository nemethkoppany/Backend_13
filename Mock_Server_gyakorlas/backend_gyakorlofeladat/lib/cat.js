"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cat = /** @class */ (function () {
    function Cat(init) {
        this.name = "";
        this.breed = "";
        this.gender = false;
        this.age = null;
        this.picurl = null;
        Object.assign(this, init);
    }
    return Cat;
}());
exports.default = Cat;
