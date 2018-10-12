import "jasmine";
import {Miner} from "../../src/blockchain/miner"
import {Block} from "../../src/blockchain/block"

describe("Chain", () => {
    describe("mineBlock()", () => {
        it("should have an output containing a difficult enough hash of the block", () => {
            Miner.mineBlock(0, 3, "miner test", "previousHash").then((block: Block) => {
                expect(block.hash.substring(0, 3)).toEqual("000");
            });
        });
    });
});