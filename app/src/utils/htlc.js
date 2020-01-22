/* eslint-disable max-len */
const crypto = require('crypto')

// Format required for sending bytes through eth client:
//  - hex string representation
//  - prefixed with 0x
const bufToStr = b => '0x' + b.toString('hex')

const sha256 = x =>
  crypto
    .createHash('sha256')
    .update(x)
    .digest()

const random32 = () => crypto.randomBytes(32)

const isSha256Hash = hashStr => /^0x[0-9a-f]{64}$/i.test(hashStr)

const newSecretHashPair = () => {
  const secret = random32()
  const hash = sha256(secret)
  return {
    secret: bufToStr(secret),
    hash: bufToStr(hash)
  }
}
function getHTLCContractAddress(network = null) {
  const localNetwork = network === null ? 'mainnet' : network

  const htlcContractAddresses = {
    rinkeby: {
      eth: '0x2067806D8388C409e030a8cb53Dd431495202754',
      erc20: '0xaa303beE4D7555830b8a24dEDD79999828cED219',
      erc721: '0xda64994D2EeCb6de2988cEebbb9b6e37b1F1480E'
    }
  }

  return htlcContractAddresses[localNetwork.toLowerCase()]
}

module.exports = {
  htlcETHABI:
    '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"contractId","type":"bytes32"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"hashlock","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"timelock","type":"uint256"}],"name":"LogHTLCNew","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"contractId","type":"bytes32"}],"name":"LogHTLCRefund","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"contractId","type":"bytes32"}],"name":"LogHTLCWithdraw","type":"event"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_contractId","type":"bytes32"}],"name":"getContract","outputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes32","name":"hashlock","type":"bytes32"},{"internalType":"uint256","name":"timelock","type":"uint256"},{"internalType":"bool","name":"withdrawn","type":"bool"},{"internalType":"bool","name":"refunded","type":"bool"},{"internalType":"bytes32","name":"preimage","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"getContractId","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address payable","name":"_receiver","type":"address"},{"internalType":"bytes32","name":"_hashlock","type":"bytes32"},{"internalType":"uint256","name":"_timelock","type":"uint256"}],"name":"newContract","outputs":[{"internalType":"bytes32","name":"contractId","type":"bytes32"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_contractId","type":"bytes32"}],"name":"refund","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_contractId","type":"bytes32"},{"internalType":"bytes32","name":"_preimage","type":"bytes32"}],"name":"withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]',
  htlcERC20ABI:
    '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"contractId","type":"bytes32"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"address","name":"tokenContract","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"hashlock","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"timelock","type":"uint256"}],"name":"HTLCERC20New","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"contractId","type":"bytes32"}],"name":"HTLCERC20Refund","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"contractId","type":"bytes32"}],"name":"HTLCERC20Withdraw","type":"event"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_contractId","type":"bytes32"}],"name":"getContract","outputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"address","name":"tokenContract","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes32","name":"hashlock","type":"bytes32"},{"internalType":"uint256","name":"timelock","type":"uint256"},{"internalType":"bool","name":"withdrawn","type":"bool"},{"internalType":"bool","name":"refunded","type":"bool"},{"internalType":"bytes32","name":"preimage","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"bytes32","name":"_hashlock","type":"bytes32"},{"internalType":"uint256","name":"_timelock","type":"uint256"},{"internalType":"address","name":"_tokenContract","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"newContract","outputs":[{"internalType":"bytes32","name":"contractId","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_contractId","type":"bytes32"}],"name":"refund","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_contractId","type":"bytes32"},{"internalType":"bytes32","name":"_preimage","type":"bytes32"}],"name":"withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]',
  htlcERC721ABI:
    '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"contractId","type":"bytes32"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"address","name":"tokenContract","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"hashlock","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"timelock","type":"uint256"}],"name":"HTLCERC721New","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"contractId","type":"bytes32"}],"name":"HTLCERC721Refund","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"contractId","type":"bytes32"}],"name":"HTLCERC721Withdraw","type":"event"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_contractId","type":"bytes32"}],"name":"getContract","outputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"address","name":"tokenContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes32","name":"hashlock","type":"bytes32"},{"internalType":"uint256","name":"timelock","type":"uint256"},{"internalType":"bool","name":"withdrawn","type":"bool"},{"internalType":"bool","name":"refunded","type":"bool"},{"internalType":"bytes32","name":"preimage","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"bytes32","name":"_hashlock","type":"bytes32"},{"internalType":"uint256","name":"_timelock","type":"uint256"},{"internalType":"address","name":"_tokenContract","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"newContract","outputs":[{"internalType":"bytes32","name":"contractId","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_contractId","type":"bytes32"}],"name":"refund","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_contractId","type":"bytes32"},{"internalType":"bytes32","name":"_preimage","type":"bytes32"}],"name":"withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]',
  getHTLCContractAddress,
  newSecretHashPair,
  isSha256Hash
}
