import net = require("net");
import { Log } from "../utils/log";
import { Chain } from "../blockchain/chain"
import { Block } from "../blockchain/block"

export class BlockMaker {

    private tag = 'BlockMaker';
    private port: number;
    private host: string;
    private server: net.Server;
    private chain: Chain;
    private nodes: net.Socket[] = [];
 
    private static instance: BlockMaker;
    private constructor(host: string, port: number, chain: Chain) { 
        this.host = host;
        this.port = port;
        this.chain = chain;
        this.server = net.createServer();
        this.serverEvents(this.server);
    }

    public static getInstance(host: string, port: number, chain: Chain) {
        if (!BlockMaker.instance) {
            BlockMaker.instance = new BlockMaker(host, port, chain);
        }
        return BlockMaker.instance;
    }

    public pushBlocks() {
        this.nodes.forEach((socket: net.Socket) => {
            socket.write(this.chain.getLastBlock().serialize()+"|");
        });
    }

    private serverEvents(server: net.Server) {

        server.listen(this.port, this.host, () => {
            Log.info(this.tag, 'blockmaker listening on', this.host, ':', this.port);
        });

        server.on('error', (err: any) => {
            if (err.code == 'EADDRINUSE') {
                Log.error(this.tag, 'address in use.');
            } else {
                Log.error(this.tag, err.toString());
            }
        });

        server.on('connection', (socket: net.Socket) => {
            this.nodes.push(socket);
            Log.info(this.tag, 'There are now ' + this.nodes.length + ' node(s) connected.');
            this.chain.blockChain.forEach((block: Block) => {
                socket.write(block.serialize()+"|");
            });
        });
    }

}