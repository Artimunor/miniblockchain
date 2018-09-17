"use strict";
exports.__esModule = true;
var Block = /** @class */ (function () {
    function Block(index, nonce, data, hash, previousHash) {
        this._index = index;
        this._nonce = nonce;
        this._data = data;
        this._hash = hash;
        this._previousHash = previousHash;
    }
    Object.defineProperty(Block.prototype, "hash", {
        get: function () {
            return this._hash;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "index", {
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "nonce", {
        get: function () {
            return this._nonce;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "previousHash", {
        get: function () {
            return this._previousHash;
        },
        enumerable: true,
        configurable: true
    });
    Block.prototype.pad = function (st, size, padSign) {
        while (st.length < size)
            st = st + padSign;
        if (st.length > size) {
            st = st.substr(0, size);
        }
        return st;
    };
    Block.prototype.print = function () {
        console.log("");
        console.log("┎─BLOCK " + this.pad(String(this.index), 40, "─") + "─────────┒");
        console.log("┃  Previous:   " + this.pad(this.previousHash, 42, " ") + "┃");
        console.log("┃  Nonce:      " + this.pad(String(this.nonce), 42, " ") + "┃");
        console.log("┃  Data:       " + this.pad(this.data, 42, " ") + "┃");
        console.log("┃  Hash:       " + this.pad(this.hash, 42, " ") + "┃");
        console.log("┖────────────────────────────────────────────────────────┚");
    };
    return Block;
}());
exports["default"] = Block;
