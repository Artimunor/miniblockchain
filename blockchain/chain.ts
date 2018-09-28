import { Block } from "./block"

export class Chain {

    public blockChain : Block[];

    constructor() {
        this.blockChain = [];
    }

    public getLastBlock() {
        return this.blockChain[this.blockChain.length-1];
    }

    public addBlock(block: Block) {
        this.blockChain.push(block);
        this.print();
    }

    public addBlockFromJson(block: any) {
        this.blockChain.push(new Block(block.index, block.nonce, block.data, block.hash, block.previousHash));
        this.print();
    }

    public print() {
        for(let j in this.blockChain) {
            this.blockChain[j].print();
        }
    }
}
