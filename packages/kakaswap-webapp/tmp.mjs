import { utils } from '@uniswap/sdk';
import dotenv from 'dotenv';
import { ethers } from 'ethers';
import factoryABI from './src/constants/abis/UniswapV2Factory.json' assert { type: 'json' };
import zeniABI from './src/constants/abis/Zeni.json' assert { type: 'json' };
dotenv.config();

const address = utils.validateAndParseAddress('0x98159b3bb5e04f1b11c4967b1de81329cd3c8345');

console.log('address', address);

const rpcUrl = 'https://goerli.infura.io/v3/f4b15957ae81470c9329a53e05cb8fa7';
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const factoryAddress = '0xd1654fC9BE213E17a8B5E77120cb8C4BadC7ae4b';
const zeniAddress = '0x82BcaCd36deA496C4F90B5FfA2347380a7C265d1';
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
