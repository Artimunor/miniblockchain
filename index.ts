// npm i @types/inquirer
import inquirer = require('inquirer');
import { Log, LOG_LEVEL } from "./utils/log";
import { Chain } from "./blockchain/chain"
import { Miner } from "./blockchain/miner"
import { BlockMaker } from "./network/blockmaker"
import { Node } from "./network/node"

Log.level = LOG_LEVEL.DEBUG;

const host = "localhost";
const port = 8191;

var startupType = "";
var chain : Chain;

var blockmaker : BlockMaker;
var node : Node;

var blockDataQuestions = [
    {
        type: 'number',
        name: 'difficulty',
        message: 'Enter difficulty: ',
        default: 3,
        validate: function(value : any) {
            if (typeof value === 'number') {
                return true;
            }
            //return 'Please enter a valid number';
            return true;
        }
    },
    {
        type: 'input',
        name: 'data',
        message: 'Enter data: ',
        default: 'some data'
    }
]

var serverQuestion = [
    {
        type: 'list',
        name: 'type',
        message: 'Run as: ',
        choices: ['BlockMaker', 'Node'],
        default: 'Node'
    }
]

var requestStartupType = function() {
    inquirer.prompt(serverQuestion).then(function(answers:any) {
        startupType = answers.type;
    }).then(startUp) 
}

var startUp = function() {

    if (startupType == "BlockMaker") {

        // initialize the blockchain with the required genesis data
        chain = new Chain(Miner.mineBlock(0, 1, "GENESIS", "NONE"));
        chain.print();

        // get an instance of the BlockMaker server.
        blockmaker = BlockMaker.getInstance(host, port, chain);

        // start a recursive function to ask for input data turn it into a new block that is added to the blockchain
        requestBlockData();

    } else {

        node = Node.getInstance(host, port, chain);
    }
}

var requestBlockData = function() {

    inquirer.prompt(blockDataQuestions).then(function(answers:any) {
        var previousBlock = chain.getLastBlock();
        chain.addBlock(Miner.mineBlock(previousBlock.index + 1, answers.difficulty, answers.data, previousBlock.hash));
        chain.print();
        blockmaker.pushBlocks();
    }).then(requestBlockData);
}

requestStartupType();
