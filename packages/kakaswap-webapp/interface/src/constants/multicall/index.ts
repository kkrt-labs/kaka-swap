import { ChainId } from '@jb1011/wagmi'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0xb465Fd2d9C71d5D6e6c069aaC9b4E21c69aAA78f',
  [ChainId.WAGMI]: '0x4475A8FBeF5Cf4a92a484B6f5602A91F3abC72D8'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
