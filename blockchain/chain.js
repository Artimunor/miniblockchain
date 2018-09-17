"use strict";
exports.__esModule = true;
var Chain = /** @class */ (function () {
    function Chain(genesis) {
        this.blockChain = [genesis];
    }
    Chain.prototype.getLastBlock = function () {
        return this.blockChain[this.blockChain.length - 1];
    };
    Chain.prototype.addBlock = function (block) {
        this.blockChain.push(block);
    };
    Chain.prototype.print = function () {
        for (var j in this.blockChain) {
            this.blockChain[j].print();
        }
    };
    return Chain;
}());
exports["default"] = Chain;
