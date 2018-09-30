import "jasmine";
import {Chain} from "../../blockchain/chain"
import {Block} from "../../blockchain/block"

describe("Chain", () => {

    let block = new Block(0, 1, "chain test", "hash", "previousHash");

    let chain = new Chain();

    chain.addBlock(block);
 
    describe("getLastBlock()", () => {

        it("should have an output containing 'chain test'", () => {
            expect(chain.getLastBlock().data).toBe("chain test");
        });
    });

    describe("chain.blockChain.length", () => {

        it("should have an blockchain with length 1", () => {
            expect(chain.blockChain.length).toBe(1);
        });
    });
});