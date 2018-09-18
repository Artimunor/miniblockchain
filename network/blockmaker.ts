import net = require("net");
import { Log } from "../utils/log";

export class BlockMaker {

    private tag = 'BlockMaker';
    private port: number = 0;
    private host: string = "";
    private server: net.Server;

    private static instance: BlockMaker;
    private constructor(host: string, port: number) { 
        this.host = host;
        this.port = port;
        this.server = net.createServer((socket: net.Socket) => {
            // on socket connection:
    
        });
        this.nodeEvents(this.server);
    }

    public static getInstance(host: string, port: number) {
        if (!BlockMaker.instance) {
            BlockMaker.instance = new BlockMaker(host, port);
        }
        return BlockMaker.instance;
    }

    private nodeEvents(server: net.Server) {

        server.on('error', (err: any) => {
            if (err.code == 'EADDRINUSE') {
                Log.error(this.tag, 'Address in use.');
            } else {
                Log.error(this.tag, err.toString());
            }
        });

        server.listen(this.port, this.host, () => {
            Log.info(this.tag, 'bind to', this.host, ':', this.port);
        });
    }

}