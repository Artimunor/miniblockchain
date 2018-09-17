import { Block } from "./block"

export class Chain {

    private blockChain : Block[];

    constructor(genesis: Block) {
        this.blockChain = [genesis];
    }

    public getLastBlock() {
        return this.blockChain[this.blockChain.length-1];
    }

    public addBlock(block: Block) {
        this.blockChain.push(block);
    }

    public print() {
        for(let j in this.blockChain) {
            this.blockChain[j].print();
        }
    }
}
