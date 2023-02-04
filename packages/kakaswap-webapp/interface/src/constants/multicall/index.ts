import { ChainId } from '@jean1011/kakarot'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0xb465Fd2d9C71d5D6e6c069aaC9b4E21c69aAA78f',
  [ChainId.WAGMI]: '0xf427122c2c93e23AFa374dd22F97d1821f605935'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
