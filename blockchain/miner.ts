import crypto from "crypto";
import cluster from "cluster";
import { Log } from "../utils/log";
import { Block } from "./block";
import { Chain } from "./chain"
import { BlockMaker } from "../network/blockmaker"
import { requestDifficulty, requestBlockData} from "../utils/interaction"

export class Miner {

    public static mineBlock(index: number, difficulty: number, data: string, previousHash: string) : Promise<Block> {

        const tag: string = "Miner";
        let start: string = "";
        let hash: string = "";
        let nonce: number = 0;

        return new Promise<Block>((resolve) => {

            for (let i = 0; i < difficulty; i++) {
                start += "0";
            }

            Log.info(tag, "Start with mining Block", index, "with difficulty", difficulty);
            
            do {
                hash = this.getSHA256Hash(nonce + data + previousHash);
                Log.info(tag, hash);
                nonce++;
            } while (hash.substr(0, difficulty) != start)

            resolve(new Block(index, nonce, data, hash, previousHash));
        });
    }

    public static createMineWorker (chain: Chain, blockmaker: BlockMaker) {

        const mineWorker = cluster.fork({alias: "mineworker"})
        let difficulty = 0;
    
        mineWorker.on("message", (newBlock) => {
            chain.addBlock(newBlock);
            blockmaker.pushBlocks();
            requestBlockData(difficulty, chain, mineWorker);
        });

        cluster.on("online", (worker) => {
            if (worker == mineWorker) {
                setTimeout(() => {
                    requestDifficulty().then((difficultyChoice) => {
                        difficulty = difficultyChoice;
                        requestBlockData(difficulty, chain, mineWorker);
                    });
                }, 1000);
            }
        });
    }

    public static mineEvents() {
        
        process.on("message", function(mineRequest) {

            Miner.mineBlock(mineRequest.index, mineRequest.difficulty, mineRequest.data, mineRequest.previousBlockHash).then((newBlock: Block) => {

                (<any> process).send({
                    index: newBlock.index,
                    nonce: newBlock.nonce,
                    data: newBlock.data,
                    hash: newBlock.hash,
                    previousHash: newBlock.previousHash
                });
            });
        });
    }

    public static getSHA256Hash = function(data: string) {
        return crypto.createHash("sha256").update(data).digest("hex");
    }
}
