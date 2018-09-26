// npm i @types/object-hash
import hashLib = require('object-hash');

import { Block } from './block';
import { Log } from "../utils/log";

export class Miner {

    public static mineBlock(index: number, difficulty: number, data: string, previousHash: string) : Promise <string> {

        var tag = "Miner";
        var start: string = "";
        var hash: string = "";
        var nonce: number = 0;

        return new Promise<string>((resolve) => {

            for (var i = 0; i < difficulty; i++) {
                start += "0";
            }

            Log.info(tag, "Start with mining Block "+index+" with difficulty "+difficulty);
            
            do {
                hash = hashLib.sha1(nonce + data + previousHash);
                Log.info(tag, hash);
                nonce++;
            } while (hash.substr(0, difficulty) != start)

            resolve(hash);
        });
    }
}
