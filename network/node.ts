import net = require("net");
import { Log } from "../utils/log";
import { Chain } from "../blockchain/chain"

export class Node {

    private tag = 'Node';
    private port: number = 0;
    private host: string = "";
    private client: net.Socket;
    private chain: Chain;

    private static instance: Node;
    private constructor(host: string, port: number, chain: Chain) { 
        this.host = host;
        this.port = port;
        this.chain = chain;
        this.client = net.createConnection(this.port, this.host);
        this.nodeEvents(this.client);
    }

    public static getInstance(host: string, port: number, chain: Chain) {
        if (!Node.instance) {
            Node.instance = new Node(host, port, chain);
        }
        return Node.instance;
    }

    public nodeEvents(client: net.Socket) {

        client.on('error', (error) => {
            Log.error(this.tag, error.toString());
        });

        client.on('end', () => {
            Log.debug(this.tag, 'disconnected from server.');
        });

        client.on('connect', (socket: net.Socket) => {
            Log.info(this.tag, 'connected to server '+ this.host + ':' + this.port);
        });

        this.client.on('data', (data: string) => {
            Log.info(this.tag, 'data received from server: ' + data);
            var parts = data.toString().split("|");
            parts.forEach((part:string) => {
                if (part.length > 0) {
                    this.chain.addBlockFromJson(JSON.parse(part));
                }
            });
        });
    }
}