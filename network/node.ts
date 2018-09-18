import * as net from "net";
import { Log } from "../utils/log";

export class Node {

    private tag = 'Node';
    private port: number = 0;
    private host: string = "";
    private client: net.Socket;

    private static instance: Node;
    private constructor(host: string, port: number) { 
        this.host = host;
        this.port = port;
        this.client = net.createConnection(this.port, this.host, () => {
            Log.debug(this.tag, 'connected to server');
        });
        this.initializeClient();
    }

    public static getInstance(host: string, port: number) {
        if (!Node.instance) {
            Node.instance = new Node(host, port);
        }
        return Node.instance;
    }

    public initializeClient() {

        this.client.on('error', (error) => {
            Log.debug(this.tag, error.toString());
        });

        this.client.on('end', () => {
            Log.debug(this.tag, 'disconnected from server.');
        });
    }

}