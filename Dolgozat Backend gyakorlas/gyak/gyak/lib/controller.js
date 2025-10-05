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
exports.getAllData = getAllData;
exports.getDataById = getDataById;
exports.deletDataById = deletDataById;
exports.postData = postData;
exports.patchDataById = patchDataById;
exports.putDataById = putDataById;
var data_1 = require("./data");
function getAllData(req, res) {
    res.status(200).json(data_1.data);
}
function getDataById(req, res) {
    var id = parseInt(req.params.id);
    var item = data_1.data.find(function (i) { return i.id === id; });
    if (!item) {
        res.status(404).json("fogyi vagy");
        return;
    }
    res.status(200).json(item);
}
function deletDataById(req, res) {
    var id = parseInt(req.params.id);
    var index = data_1.data.findIndex(function (i) { return i.id === id; });
    data_1.data.splice(index, 1);
    if (!index) {
        res.status(404).json("fogyi vagy");
        return;
    }
    res.status(200).json(data_1.data);
}
function postData(req, res) {
    var newdata = req.body;
    var maxId = Math.max.apply(Math, __spreadArray([], __read(data_1.data.map(function (d) { return d.id; })), false));
    newdata.id = maxId + 1;
    data_1.data.push(newdata);
    if (!newdata.id || !newdata.name || !newdata.description || !newdata.price || !newdata.stock || !newdata.pictururl) {
        res.status(404).json("fogyi vagy");
        return;
    }
    res.status(200).json(data_1.data);
}
function patchDataById(req, res) {
    var id = parseInt(req.params.id);
    var item = data_1.data.findIndex(function (i) { return i.id === id; });
    if (item === -1) {
        res.status(404).json("fogyi vagy");
        return;
    }
    data_1.data[item] = req.body;
    res.status(200).json(data_1.data);
}
function putDataById(req, res) {
    var id = parseInt(req.params.id);
    var item = data_1.data.findIndex(function (i) { return i.id === id; });
    if (item === -1) {
        var maxId = Math.max.apply(Math, __spreadArray([], __read(data_1.data.map(function (d) { return d.id; })), false));
        var newdata = req.body;
        newdata.id = maxId + 1;
        data_1.data.push(newdata);
        res.status(200).json(data_1.data);
        return;
    }
    data_1.data[item] = req.body;
    res.status(200).json(data_1.data);
}
