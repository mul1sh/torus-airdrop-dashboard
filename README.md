## Torus Airdrop Dashboard

This repo contains the code + hashlock contracts needed for the airdrop dashboard functionality of the torus app

## Installation

Run the following commands, to install the required dependencies

- `cd app`
- `npm i`

## Contract Deployment

Compile and deploy the hashlock contracts under the `solidity` folder to the ethereum network.

Afterwards set the contract addresses in the `app/src/utils/htlc.js` [file](/app/src/utils/htlc.js) in the function `getHTLCContractAddress`

## Contract Testing

To test the haslock contracts, please follow the instructions [here](/solidity/README.md)

## Usage

After setting up the app as explained above, you can now run it with the command `npm run serve`



