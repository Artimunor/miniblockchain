// npm i @types/object-hash
import hashLib = require('object-hash');
import { Block } from './block';

export class Miner {

    public mineBlock(index: number, difficulty: number, data: string, previousHash: string) {

        var start: string = "";
        var hash: string = "";
        var nonce: number = 0;

        for (var i = 0; i < difficulty; i++) {
            start += "0";
        }
        console.log(start);
        do {
            hash = hashLib.sha1(nonce + data + previousHash);
            console.log(hash);
            nonce++;
        } while (hash.substr(0, difficulty) != start)

        return new Block(index, nonce, data, hash, previousHash);
    }
}
