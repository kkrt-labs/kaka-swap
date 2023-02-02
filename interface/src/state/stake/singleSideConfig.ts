import { ChainId, WAVAX } from '@0xkilo/wagmi'
import { PNG } from '../../constants'
import { SingleSideStaking } from './hooks'

export const SINGLE_SIDE_STAKING: { [key: string]: SingleSideStaking } = {
  PNG_V0: {
    rewardToken: PNG[ChainId.WAGMI],
    conversionRouteHops: [WAVAX[ChainId.WAGMI]],
    stakingRewardAddress: '0x75cc4e6dFb151Dca86Df115c2d095Fd6aE90E4D9',
    version: 0
  }
}

export const SINGLE_SIDE_STAKING_V0: SingleSideStaking[] = Object.values(SINGLE_SIDE_STAKING).filter(
  staking => staking.version === 0
)
export const SINGLE_SIDE_STAKING_REWARDS_CURRENT_VERSION = Math.max(
  ...Object.values(SINGLE_SIDE_STAKING).map(staking => staking.version)
)

export const SINGLE_SIDE_STAKING_REWARDS_INFO: {
  [chainId in ChainId]?: SingleSideStaking[][]
} = {
  [ChainId.WAGMI]: [SINGLE_SIDE_STAKING_V0]
}
