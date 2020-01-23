# Torus Airdrop Dashboard

This repo contains the code + hashlock contracts needed for the airdrop dashboard functionality of the torus app. It has been rebased to contain all the latest changes from the torus-website repo

## Installation

Run the following commands, to install the required dependencies

- `cd app`
- `npm i`

The airdrop functionality has been implemented in 4 files, which are

- The `app/src/containers/WalletHome/WalletHomeMain/WalletHomeMain.vue` [file](/app/src/containers/WalletHome/WalletHomeMain/WalletHomeMain.vue) for checking for airdrop withdrawals or refunds
- The `app/src/containers/WalletTransfer/WalletTransfer.vue` [file](/app/src/containers/WalletTransfer/WalletTransfer.vue) for the airdrop functionality
- The `app/src/containers/WalletTransfer/WalletTransfer.scss` [file](/app/src/containers/WalletTransfer/WalletTransfer.scss) for the styling
- The `app/src/utils/htlc.js` [file](/app/src/utils/htlc.js) for the hashlock contract abi's and addresses

## App Flow

- The dashboard allows you to select a file containing a list of addresses + the corresponding token amounts for the airdrop.

- After selecting the file, if all the addresses are valid for the selected channel and the total amount to be airdropped is less than or equal to the user's balance of the token, then they can do the airdrop.

- The airdrop tokens are sent to the deployed hashlock contracts for the respective token types i.e. erc20, in the ethereum network and the intended recipients receive the normal torus email alerting them of receiving a token.

- Finally once the recipient login into torus, the dashboard checks for airdrops via the function `checkForAirdrops` in the file `app/src/WalletHome/WalletHomeMain/WalletHomeMain.vue` and withdraws them to the user wallet if they are available or gets refunds for airdrops that have not been claimed after a particular date.

## Usage

After setting up the app as explained above, you can now run it with the command `npm run serve`

## Contracts

All the contracts required for the hashlocks are in the `solidity` folder. They all have test cases for them and each of the functionality is well documented inside the solidity file.

### Deployment

Compile and deploy the hashlock contracts under the `solidity` folder to the ethereum network.

Afterwards set the contract addresses in the `app/src/utils/htlc.js` [file](/app/src/utils/htlc.js) in the function `getHTLCContractAddress`

### Testing

To test the hashlock contracts, please follow the instructions [here](/solidity/README.md). All the tests are passing.
