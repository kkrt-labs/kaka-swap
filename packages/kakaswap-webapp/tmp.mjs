import dotenv from 'dotenv';
import { ethers } from 'ethers';
import factoryABI from './src/constants/abis/UniswapV2Factory.json' assert { type: 'json' };
import zeniABI from './src/constants/abis/Zeni.json' assert { type: 'json' };
dotenv.config();

const rpcUrl = 'https://goerli.infura.io/v3/f4b15957ae81470c9329a53e05cb8fa7';
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const factoryAddress = '0x90b5e89934DF64192753F528dD55516847cDEE92';
const zeniAddress = '0x29F022cd7E4320d454C105DA24a0C0dd3c7B9d86';
const wethAddress = '0xCCA292cc87533333a304BC8b15C61D4Af3e7bB1D';

const factory = new ethers.Contract(factoryAddress, factoryABI.abi, signer);

const allPairsLength = await factory.allPairsLength();
console.log('allPairsLength', allPairsLength);

const pair = await factory.getPair(wethAddress, zeniAddress);
console.log(pair);
let zeni = new ethers.Contract(zeniAddress, zeniABI.abi, signer);
console.log(await zeni.name());

zeni = zeni.connect(signer);
console.log(provider);
const tx = await zeni.mint(process.env.ADDRESS, 10_000, {
  type: 0,
  gasLimit: 20_000_000,
  gasPrice: ethers.utils.parseUnits('50', 'gwei'),
});
await provider.waitForTransaction(tx.transactionHash);
