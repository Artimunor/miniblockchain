import "jasmine";
import {Block} from "../../src/blockchain/block"

describe("Block", () => {

    let block = new Block(0, 1, "block test", "hash", "previousHash");
 
    describe("serialize()", () => {

        it("should have an output containing 'block test'", () => {
            expect(block.serialize()).toContain("block test");
        });
    });
});