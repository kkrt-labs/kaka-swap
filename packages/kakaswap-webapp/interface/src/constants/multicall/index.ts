import { ChainId } from '@jean1011/kakarot'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0xb465Fd2d9C71d5D6e6c069aaC9b4E21c69aAA78f',
  [ChainId.WAGMI]: '0xa052A983a79d7e5Ba8744c9304D0E9357a87f902'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
