import cluster = require('cluster');
import { requestStartupType} from "./utils/interaction"
import { Log, LOG_LEVEL } from "./utils/log";
import { BlockMaker } from "./network/blockmaker"
import { Node } from "./network/node"
import { Chain } from "./blockchain/chain"
import { Miner } from "./blockchain/miner"

Log.level = LOG_LEVEL.ALL;

const tag = 'Main';
const host = "localhost";
const port = 8191;

var chain : Chain = new Chain();

var startUp = function(startupType: string) {

    if (startupType == "BlockMaker") {
        Miner.createMineWorker(chain, BlockMaker.getInstance(host, port, chain));
    } else {
        Node.getInstance(host, port, chain);
    }
}

if (cluster.isMaster) {

    Log.info(tag, 'Master process started with pid', process.pid);

    requestStartupType().then(startUpType => startUp(startUpType));

} else {

    Log.info(tag, 'Worker process started with pid', process.pid, 'and alias', `'${process.env.alias}'`);

    if (process.env.alias === 'mineworker') {

        Miner.mineEvents();

    } else { // listener workers


    }
}
