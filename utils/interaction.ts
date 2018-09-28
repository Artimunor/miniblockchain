import inquirer = require('inquirer');
import { Worker } from 'cluster';
import { Chain } from '../blockchain/chain';

var serverQuestion = [{
    type: 'list',
    name: 'type',
    message: 'Run as: ',
    choices: ['BlockMaker', 'Node'],
    default: 'Node'
}]

var difficultyQuestion = [{
        type: 'number',
        name: 'difficulty',
        message: 'Enter difficulty: ',
        default: 3
}]

var blockDataQuestion = [{
        type: 'input',
        name: 'data',
        message: 'Enter data: ',
        default: 'some data'
}]

export let requestStartupType = () : Promise<string> => {
    return new Promise<string>(resolve => {
        inquirer.prompt(serverQuestion).then(function(answers:any) {
            return resolve(answers.type);
        });
    });
}

export let requestDifficulty = () : Promise<number> => {
    return new Promise<number>(resolve => {
        inquirer.prompt(difficultyQuestion).then(function(answers:any) {
            return resolve(answers.difficulty);
        });
    });
}

export let requestBlockData = (difficulty: number, chain: Chain, miner: Worker) => {
    
    if (chain.blockChain.length == 0) {
        miner.send({
            index: 0,
            difficulty: difficulty,
            data: Chain.genesisData,
            previousBlockHash: "-"
        });

    } else {

        inquirer.prompt(blockDataQuestion).then((answers:any) => {
            var previousBlock = chain.getLastBlock();
            miner.send({
                index: previousBlock.index + 1,
                difficulty: difficulty,
                data: answers.data,
                previousBlockHash: previousBlock.hash
            });
        });
    }
}
