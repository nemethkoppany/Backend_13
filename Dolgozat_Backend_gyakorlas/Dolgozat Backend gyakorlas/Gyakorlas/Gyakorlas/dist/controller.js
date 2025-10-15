"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.insertProduct = insertProduct;
exports.updateProduct = updateProduct;
exports.patchProduct = patchProduct;
exports.deleteProduct = deleteProduct;
var data_1 = __importDefault(require("./data"));
function run(_req, res) {
    res.send("A szerver fut");
}
function getAllProducts(_req, res) {
    res.send(data_1.default);
}
function getProductById(req, res) {
    var id = parseInt(req.params.id);
    for (var i = 0; i < data_1.default.length; i++) {
        if (data_1.default[i].id === id) {
            res.send(data_1.default[i]);
            return;
        }
    }
    res.status(404).send("Nincs ilyen termék!");
}
function insertProduct(req, res) {
    var body = req.body;
    if (!body.name || !body.description || !body.price) {
        res.status(400).send("Hiányzó mezők!");
        return;
    }
    var newId = 1;
    for (var i = 0; i < data_1.default.length; i++) {
        if (data_1.default[i].id >= newId) {
            newId = data_1.default[i].id + 1;
        }
    }
    var newProduct = {
        id: newId,
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock || 0,
        pictururl: body.pictururl || ""
    };
    data_1.default.push(newProduct);
    res.status(201).send(newProduct);
}
function updateProduct(req, res) {
    var id = parseInt(req.params.id);
    var body = req.body;
    for (var i = 0; i < data_1.default.length; i++) {
        if (data_1.default[i].id === id) {
            var updatedProduct = {
                id: id,
                name: body.name,
                description: body.description,
                price: body.price,
                stock: body.stock || 0,
                pictururl: body.pictururl || ""
            };
            data_1.default[i] = updatedProduct;
            res.send(updatedProduct);
            return;
        }
    }
    res.status(404).send("Nem található a termék!");
}
function patchProduct(req, res) {
    var id = parseInt(req.params.id);
    var body = req.body;
    for (var i = 0; i < data_1.default.length; i++) {
        if (data_1.default[i].id === id) {
            if (body.name !== undefined) {
                data_1.default[i].name = body.name;
            }
            if (body.description !== undefined) {
                data_1.default[i].description = body.description;
            }
            if (body.price !== undefined) {
                data_1.default[i].price = body.price;
            }
            if (body.stock !== undefined) {
                data_1.default[i].stock = body.stock;
            }
            if (body.pictururl !== undefined) {
                data_1.default[i].pictururl = body.pictururl;
            }
            res.send(data_1.default[i]);
            return;
        }
    }
    res.status(404).send("Nem található a termék!");
}
function deleteProduct(req, res) {
    var id = parseInt(req.params.id);
    for (var i = 0; i < data_1.default.length; i++) {
        if (data_1.default[i].id === id) {
            data_1.default.splice(i, 1);
            res.status(204).send();
            return;
        }
    }
    res.status(404).send("Nem található a termék!");
}
