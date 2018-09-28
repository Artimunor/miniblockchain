import cluster = require('cluster');
import { Log, LOG_LEVEL } from "./utils/log";
import { Chain } from "./blockchain/chain"
import { Miner } from "./blockchain/miner"
import { BlockMaker } from "./network/blockmaker"
import { Node } from "./network/node"
import { requestStartupType} from "./utils/interaction"

Log.level = LOG_LEVEL.ALL;

const tag = 'Main';
const host = "localhost";
const port = 8191;

var chain : Chain = new Chain();

var blockmaker : BlockMaker;
var node : Node;

var startUp = function(startupType: string) {

    if (startupType == "BlockMaker") {
        blockmaker = BlockMaker.getInstance(host, port, chain);
        Miner.createMineWorker(chain, blockmaker);
    } else {
        node = Node.getInstance(host, port, chain);
    }
}

if (cluster.isMaster) {

    Log.info(tag, 'Master process started with pid', process.pid);

    requestStartupType().then(startUpType => startUp(startUpType));

} else {

    Log.info(tag, 'Worker process started with pid', process.pid, 'and alias', "'"+process.env.alias+"'");

    if (process.env.alias === 'miner') {

        process.on('message', function(mineRequest) {

            Miner.mineBlock(mineRequest.index, mineRequest.difficulty, mineRequest.data, mineRequest.previousBlockHash).then((newBlock) => {

                (<any> process).send({
                    index: newBlock.index,
                    nonce: newBlock.nonce,
                    data: newBlock.data,
                    hash: newBlock.hash,
                    previousHash: newBlock.previousHash
                });
            });
        });

    } else { // listener workers


    }
}
