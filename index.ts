// npm i @types/inquirer
import inquirer = require('inquirer');
import { Log, LOG_LEVEL } from "./utils/log";
import { Chain } from "./blockchain/chain"
import { Miner } from "./blockchain/miner"
import { BlockMaker } from "./network/blockmaker"

Log.level = LOG_LEVEL.ALL;
var host = "localhost";
var port = 8191;

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
    }).then(startUp) // start a recursive function to ask for input data turn it into a new block that is added to the blockchain
}

var startUp = function() {
    if (startupType == "BlockMaker") {
        blockmaker = new BlockMaker();
        requestBlockData();
    } else {
        node = new Node();
    }
}

var requestBlockData = function() {
    inquirer.prompt(blockDataQuestions).then(function(answers:any) {
        var previousBlock = chain.getLastBlock();
        chain.addBlock(miner.mineBlock(previousBlock.index + 1, answers.difficulty, answers.data, previousBlock.hash));
        chain.print();
    }).then(requestBlockData);
}

// start as Server or Client
var startupType = "";

// initialize the miner
var miner = new Miner();

var blockmaker;
var node;

// initialize the blockchain with the required genisis data
var chain = new Chain(miner.mineBlock(0, 1, "GENISIS", "NONE"));
chain.print();

requestStartupType();