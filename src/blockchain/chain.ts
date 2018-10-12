import { Block } from "./block"

export class Chain {

    public static genesisData = "GENESIS"

    public blockChain : Block[];

    constructor() {
        this.blockChain = [];
    }

    public getLastBlock() {
        return this.blockChain[this.blockChain.length-1];
    }

    public addBlock(block: any) {
        this.blockChain.push(new Block(block.index, block.nonce, block.data, block.hash, block.previousHash));
        this.print();
    }

    public print() {
        for(let j in this.blockChain) {
            this.blockChain[j].print();
        }
    }
}
