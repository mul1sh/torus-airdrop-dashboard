# hashed-timelock-contract-ethereum

[Hashed Timelock Contracts](https://en.bitcoin.it/wiki/Hashed_Timelock_Contracts) (HTLCs) for Ethereum for the Torus dashboard:

- [HashedTimelock.sol](contracts/HashedTimelock.sol) - HTLC for native ETH token
- [HashedTimelockERC20.sol](contracts/HashedTimelockERC20.sol) - HTLC for ERC20 tokens
- [HashedTimelockERC721.sol](contracts/HashedTimelockERC721.sol) - HTLC for ERC721 tokens

## Run Tests
* Install truffle
* Install ganache [https://truffleframework.com/ganache](https://truffleframework.com/ganache)
* Launch and set the network ID to `4447` i.e. `ganache-cli -i 4447`

```
$ npm i
$ truffle test
Using network 'test'.

Compiling ./test/helper/ASEANToken.sol...
Compiling ./test/helper/EUToken.sol...


  Contract: HashedTimelock
    ✓ newContract() should create new contract and store correct details (92ms)
    ✓ newContract() should fail when no ETH sent (84ms)
    ✓ newContract() should fail with timelocks in the past (78ms)
    ✓ newContract() should reject a duplicate contract request (159ms)
    ✓ withdraw() should send receiver funds when given the correct secret preimage (214ms)
    ✓ withdraw() should fail if preimage does not hash to hashX (111ms)
    ✓ withdraw() should fail if caller is not the receiver (162ms)
    ✓ withdraw() should fail after timelock expiry (1243ms)
    ✓ refund() should pass after timelock expiry (1273ms)
    ✓ refund() should fail before the timelock expiry (132ms)
    ✓ getContract() returns empty record when contract doesn't exist (48ms)

  Contract: HashedTimelockERC20
    ✓ newContract() should create new contract and store correct details (214ms)
    ✓ newContract() should fail when no token transfer approved (107ms)
    ✓ newContract() should fail when token amount is 0 (166ms)
    ✓ newContract() should fail when tokens approved for some random account (214ms)
    ✓ newContract() should fail when the timelock is in the past (136ms)
    ✓ newContract() should reject a duplicate contract request (282ms)
    ✓ withdraw() should send receiver funds when given the correct secret preimage (363ms)
    ✓ withdraw() should fail if preimage does not hash to hashX (227ms)
    ✓ withdraw() should fail if caller is not the receiver  (307ms)
    ✓ withdraw() should fail after timelock expiry (2257ms)
    ✓ refund() should pass after timelock expiry (2407ms)
    ✓ refund() should fail before the timelock expiry (283ms)
    ✓ getContract() returns empty record when contract doesn't exist (55ms)

  23 passing (27s)
```

### HashedTimelock

1.  `newContract(receiverAddress, hashlock, timelock)` create new HTLC with given receiver, hashlock and expiry; returns contractId bytes32
2.  `withdraw(contractId, preimage)` claim funds revealing the preimage
3.  `refund(contractId)` if withdraw was not called the contract creator can get a refund by calling this some time after the time lock has expired.

See [test/htlc.js](test/htlc.js) for examples of interacting with the contract from javascript.

### HashedTimelockERC20

1.  `newContract(receiverAddress, hashlock, timelock, tokenContract, amount)` create new HTLC with given receiver, hashlock, expiry, ERC20 token contract address and amount of tokens
2.  `withdraw(contractId, preimage)` claim funds revealing the preimage
3.  `refund(contractId)` if withdraw was not called the contract creator can get a refund by calling this some time after the time lock has expired.

See [test/htlcERC20.js](test/htlcERC20.js) for examples of interacting with the contract from javascript.

### HashedTimelockERC721

1.  `newContract(receiverAddress, hashlock, timelock, tokenContract, tokenId)` create new HTLC with given receiver, hashlock, expiry, ERC20 token contract address and the token to transfer
2.  `withdraw(contractId, preimage)` claim funds revealing the preimage
3.  `refund(contractId)` if withdraw was not called the contract creator can get a refund by calling this some time after the time lock has expired.


