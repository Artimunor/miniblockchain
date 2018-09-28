// 
import hashLib = require('object-hash');
import cluster = require('cluster');
import { Log } from "../utils/log";
import { Block } from './block';
import { Chain } from "./chain"
import { BlockMaker } from "../network/blockmaker"
import { requestDifficulty, requestBlockData} from "../utils/interaction"

export class Miner {

    public static mineBlock(index: number, difficulty: number, data: string, previousHash: string) : Promise <Block> {

        var tag = "Miner";
        var start: string = "";
        var hash: string = "";
        var nonce: number = 0;

        return new Promise<Block>((resolve) => {

            for (var i = 0; i < difficulty; i++) {
                start += "0";
            }

            Log.info(tag, "Start with mining Block", index, "with difficulty", difficulty);
            
            do {
                hash = hashLib.sha1(nonce + data + previousHash);
                Log.info(tag, hash);
                nonce++;
            } while (hash.substr(0, difficulty) != start)

            resolve(new Block(index, nonce, data, hash, previousHash));
        });
    }

    public static createMineWorker = function(chain: Chain, blockmaker: BlockMaker) {

        var mineWorker = cluster.fork({alias: 'miner'})
        var difficulty = 0;
    
        mineWorker.on('message', function(newBlock) {
            chain.addBlockFromJson(newBlock);
            blockmaker.pushBlocks();
            requestBlockData(difficulty, chain, mineWorker);
        });

        cluster.on('online', (worker) => {
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
}
