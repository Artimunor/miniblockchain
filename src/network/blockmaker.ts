import Net from "net";
import { Log } from "../utils/log";
import { Chain } from "../blockchain/chain"
import { Block } from "../blockchain/block"

export class BlockMaker {

    private tag: string = "BlockMaker";
    private port: number;
    private host: string;
    private server: Net.Server;
    private chain: Chain;
    private nodes: Net.Socket[] = [];
 
    private static instance: BlockMaker;
    private constructor(host: string, port: number, chain: Chain) { 
        this.host = host;
        this.port = port;
        this.chain = chain;
        this.server = Net.createServer();
        this.serverEvents(this.server);
    }

    public static getInstance(host: string, port: number, chain: Chain) {
        if (!BlockMaker.instance) {
            BlockMaker.instance = new BlockMaker(host, port, chain);
        }
        return BlockMaker.instance;
    }

    public pushBlocks() {
        this.nodes.forEach((socket: Net.Socket) => {
            socket.write(this.chain.getLastBlock().serialize()+"|");
        });
    }

    private serverEvents(server: Net.Server) {

        server.listen(this.port, this.host, () => {
            Log.info(this.tag, "blockmaker listening on", this.host, ':', this.port);
        });

        server.on("error", (err: any) => {
            if (err.code == "EADDRINUSE") {
                Log.error(this.tag, "address in use.");
            } else {
                Log.error(this.tag, err.toString());
            }
        });

        server.on("connection", (socket: Net.Socket) => {
            this.nodes.push(socket);
            Log.info(this.tag, "There are now " + this.nodes.length + " node(s) connected.");
            this.chain.blockChain.forEach((block: Block) => {
                socket.write(block.serialize()+"|");
            });
        });
    }

}