import hashLib = require('object-hash');

export class Block {

    private _hash: string;
    public get hash() : string {
        return this._hash;
    }

    private _index: number;
    public get index() : number {
        return this._index;
    }

    private _nonce: number;
    public get nonce() : number {
        return this._nonce;
    }

    private _data: string;
    public get data() : string {
        return this._data;
    }

    private _previousHash: string;
    public get previousHash() : string {
        return this._previousHash;
    }

    constructor(index: number, nonce: number, data: string, hash: string, previousHash: string) {
        this._index = index;
        this._nonce = nonce;
        this._data = data;
        this._hash = hash;
        this._previousHash = previousHash;
    }

    private pad(st: string, size : number, padSign: string) {
        while (st.length < size) st = st + padSign;
        if (st.length > size) {
            st = st.substr(0, size);
        }
        return st;
    }

    public serialize() {
        var json = '{"index":' + this._index;
        json += ', "nonce":"' + this._nonce + '"';
        json += ', "data":"' + this._data + '"';
        json += ', "hash":"' + this._hash + '"';
        json += ', "previousHash":"' + this._previousHash + '"}';
        return json
    }

    public print() {
        console.log("");
        console.log("┎─BLOCK "+this.pad(String(this.index),40, "─")+"─────────┒");
        console.log("┃  Previous:   " + this.pad(this.previousHash,42," ")  +"┃");
        console.log("┃  Nonce:      " + this.pad(String(this.nonce),42," ") +"┃");
        console.log("┃  Data:       " + this.pad(this.data,42, " ")         +"┃");
        console.log("┃  Hash:       " + this.pad(this.hash,42, " ")         +"┃");
        console.log("┖────────────────────────────────────────────────────────┚");
    }
}
