"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server_run = server_run;
exports.allData = allData;
exports.dataById = dataById;
exports.postData = postData;
exports.deleteData = deleteData;
exports.patchData = patchData;
exports.putData = putData;
var data_1 = require("./data");
function server_run(req, res) {
    res.status(200).json("A szerver fut");
}
function allData(req, res) {
    res.status(200).json(data_1.data);
}
function dataById(req, res) {
    var id = parseInt(req.params.id);
    for (var i = 0; i < data_1.data.length; i++) {
        if (data_1.data[i].id === id) {
            res.json(data_1.data[i]);
            return;
        }
    }
    res.status(404).json("Nem található az elem");
}
function postData(req, res) {
    var body = req.body;
    var newId = 1;
    for (var i = 0; i < data_1.data.length; i++) {
        if (data_1.data[i].id >= newId) {
            newId = data_1.data[i].id + 1;
        }
    }
    var newProduct = {
        id: newId,
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock,
        pictururl: body.pictururl
    };
    data_1.data.push(newProduct);
    res.status(200).json(newProduct);
}
function deleteData(req, res) {
    var id = parseInt(req.params.id);
    for (var i = 0; i < data_1.data.length; i++) {
        if (data_1.data[i].id === id) {
            data_1.data.splice(i, 1);
            res.status(200).json();
            return;
        }
    }
    res.status(404).json("A törlendő adat nem található");
}
function patchData(req, res) {
    var id = parseInt(req.params.id);
    var item = data_1.data.findIndex(function (i) { return i.id === id; });
    if (item === -1) {
        res.status(404).json("Az elem nem található");
        return;
    }
    data_1.data[item] = req.body;
    res.status(200).json(data_1.data);
}
function putData(req, res) {
    var id = parseInt(req.params.id);
    var item = data_1.data.findIndex(function (i) { return i.id === id; });
    if (item === -1) {
        var maxID = Math.max.apply(Math, __spreadArray([], __read(data_1.data.map(function (d) { return d.id; })), false));
        var newData = req.body;
        newData.id = maxID + 1;
        data_1.data.push(newData);
        res.status(200).json(newData);
        return;
    }
    data_1.data[item] = req.body;
    res.status(200).json(data_1.data);
}
