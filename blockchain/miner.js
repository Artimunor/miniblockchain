"use strict";
exports.__esModule = true;
// npm i @types/object-hash
var hashLib = require("object-hash");
var block_1 = require("./block");
var Miner = /** @class */ (function () {
    function Miner() {
    }
    Miner.prototype.mineBlock = function (index, difficulty, data, previousHash) {
        var start = "";
        var hash = "";
        var nonce = 0;
        for (var i = 0; i < difficulty; i++) {
            start += "0";
        }
        console.log(start);
        do {
            hash = hashLib.sha1(nonce + data + previousHash);
            console.log(hash);
            nonce++;
        } while (hash.substr(0, difficulty) != start);
        return new block_1["default"](index, nonce, data, hash, previousHash);
    };
    return Miner;
}());
exports["default"] = Miner;
