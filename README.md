# miniblockchain

## Instalation
* npm install

## Build
* npm run-script build

## Test
* npm test

## Run
* npm run-script exe

## Usage
* Run the blockchain with 'npm run-script exe' on a commandline.
* Choose if you want to be a 'blockmaker' (server) or 'node' (client) <br>Only one 'blockmaker' can exist and it has to be started first.<br>When you have a 'blockmaker' started, open another terminal to run a 'node'. (not to be confused with NodeJS)
* Choose your mining difficulty (default: 3) when prompted.<br>WARNING: if you choose a high number mining will take very long, anything higher than 6 is not advisable, especially with the log level set to ALL.
* Enter some data (default: 'some data') to be put in the block when prompted.
