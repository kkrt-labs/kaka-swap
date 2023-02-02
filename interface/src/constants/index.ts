import { ChainId, JSBI, Percent, Token, WAVAX } from '@jb1011/wagmi'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { gnosisSafe, injected, walletlink, walletconnect } from '../connectors'

export const GAS_PRICE = 225

export const ROUTER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x2D99ABD9008Dc933ff5c0CD271B88309593aB921',
  [ChainId.WAGMI]: '0xe8225d13Fbd632fa9541D0A2C256E993fE44cB07'
}

export const LANDING_PAGE = 'https://pangolin.exchange/'
export const ANALYTICS_PAGE = 'https://info.pangolin.exchange/'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const GOVERNANCE_ADDRESS = '0xb0Ff2b1047d9E8d294c2eD798faE3fA817F43Ee1'

export const BRIDGE_MIGRATOR_ADDRESS = '0x4b23Aa72A1214d0E4fd3f2c8Da7C6ba660F7483C'

export const MINICHEF_ADDRESS = '0x37D368a7C081744b9960aF265E881c781ac98361'

export const NATIVE = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const PNG: { [chainId in ChainId]: Token } = {
  [ChainId.FUJI]: new Token(ChainId.FUJI, '0x83080D4b5fC60e22dFFA8d14AD3BB41Dde48F199', 18, 'PNG', 'Pangolin'),
  [ChainId.WAGMI]: new Token(ChainId.WAGMI, '0x3f54c7a3746C0409DD185027397907488F792372', 18, 'wagmiPNG', 'Pangolin')
}

export const wWAGMI: { [chainId in ChainId]: Token } = {
  [ChainId.FUJI]: new Token(ChainId.FUJI, ZERO_ADDRESS, 18, 'ETH', 'Ether'),
  [ChainId.WAGMI]: new Token(ChainId.WAGMI, '0xDFBb4b49DfAe39720f68f8297ADb2368FeffaDdb', 18, 'wWAGMI', 'Wrapped WAGMI')
}

export const OG: { [chainId in ChainId]: Token } = {
  [ChainId.FUJI]: new Token(ChainId.FUJI, ZERO_ADDRESS, 18, 'ETH', 'Ether'),
  [ChainId.WAGMI]: new Token(ChainId.WAGMI, '0xB6157727b2989aE46e970B451A289941Ce8B41FA', 18, 'OG', 'OG')
}

export const USDT: { [chainId in ChainId]: Token } = {
  [ChainId.FUJI]: new Token(ChainId.FUJI, ZERO_ADDRESS, 6, 'USDT', 'Tether USD'),
  [ChainId.WAGMI]: new Token(
    ChainId.WAGMI,
    '0xde3A24028580884448a5397872046a019649b084',
    6,
    'USDT',
    'Tether USD'
  )
}

export const USDTe: { [chainId in ChainId]: Token } = {
  [ChainId.FUJI]: new Token(ChainId.FUJI, ZERO_ADDRESS, 6, 'USDT.e', 'Tether USD'),
  [ChainId.WAGMI]: new Token(
    ChainId.WAGMI,
    '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
    6,
    'USDT.e',
    'Tether USD'
  )
}

export const DAI: { [chainId in ChainId]: Token } = {
  [ChainId.FUJI]: new Token(ChainId.FUJI, ZERO_ADDRESS, 18, 'DAI', 'Dai Stablecoin'),
  [ChainId.WAGMI]: new Token(
    ChainId.WAGMI,
    '0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a',
    18,
    'DAI',
    'Dai Stablecoin'
  )
}

export const DAIe: { [chainId in ChainId]: Token } = {
  [ChainId.FUJI]: new Token(ChainId.FUJI, ZERO_ADDRESS, 18, 'DAI.e', 'Dai Stablecoin'),
  [ChainId.WAGMI]: new Token(
    ChainId.WAGMI,
    '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
    18,
    'DAI.e',
    'Dai Stablecoin'
  )
}

export const UNI: { [chainId in ChainId]: Token } = {
  [ChainId.FUJI]: new Token(ChainId.FUJI, ZERO_ADDRESS, 18, 'UNI', 'Uniswap'),
  [ChainId.WAGMI]: new Token(ChainId.WAGMI, '0xf39f9671906d8630812f9d9863bBEf5D523c84Ab', 18, 'UNI', 'Uniswap')
}

export const USDCe: { [chainId in ChainId]: Token } = {
  [ChainId.FUJI]: new Token(ChainId.FUJI, ZERO_ADDRESS, 6, 'USDC.e', 'USD Coin'),
  [ChainId.WAGMI]: new Token(
    ChainId.WAGMI,
    ZERO_ADDRESS,
    6,
    'USDC.e',
    'USD Coin'
  )
}

export const SUSHI: { [chainId in ChainId]: Token } = {
  [ChainId.FUJI]: new Token(ChainId.FUJI, ZERO_ADDRESS, 18, 'SUSHI', 'SushiToken'),
  [ChainId.WAGMI]: new Token(
    ChainId.WAGMI,
    ZERO_ADDRESS,
    18,
    'SUSHI',
    'SushiToken'
  )
}

export const APEIN: { [chainId in ChainId]: Token } = {
  [ChainId.FUJI]: new Token(ChainId.FUJI, ZERO_ADDRESS, 18, 'APEIN', 'Ape In'),
  [ChainId.WAGMI]: new Token(ChainId.WAGMI, '0x938FE3788222A74924E062120E7BFac829c719Fb', 18, 'APEIN', 'Ape In')
}

export const MIM: { [chainId in ChainId]: Token } = {
  [ChainId.FUJI]: new Token(ChainId.FUJI, ZERO_ADDRESS, 18, 'MIM', 'Magic Internet Money'),
  [ChainId.WAGMI]: new Token(
    ChainId.WAGMI,
    '0x130966628846BFd36ff31a822705796e8cb8C18D',
    18,
    'MIM',
    'Magic Internet Money'
  )
}


export const AIRDROP_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.FUJI]: ZERO_ADDRESS,
  [ChainId.WAGMI]: '0xbD45dB6d3dC4c7499838Ff32715baB0A414cb1A0'
}

const WAVAX_AND_PNG_ONLY: ChainTokenList = {
  [ChainId.FUJI]: [WAVAX[ChainId.FUJI], PNG[ChainId.FUJI]],
  [ChainId.WAGMI]: [WAVAX[ChainId.WAGMI], PNG[ChainId.WAGMI]]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.FUJI]: [WAVAX[ChainId.FUJI], PNG[ChainId.FUJI]],
  [ChainId.WAGMI]: [
    WAVAX[ChainId.WAGMI],
    PNG[ChainId.WAGMI],
    USDTe[ChainId.WAGMI],
    DAIe[ChainId.WAGMI],
    USDCe[ChainId.WAGMI]
  ]
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.WAGMI]: {}
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WAVAX_AND_PNG_ONLY
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WAVAX_AND_PNG_ONLY
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.WAGMI]: []
}

// these tokens can be directly linked to (via url params) in the swap page without prompting a warning
export const TRUSTED_TOKEN_ADDRESSES: { readonly [chainId in ChainId]: string[] } = {
  [ChainId.FUJI]: [],
  [ChainId.WAGMI]: [WAVAX[ChainId.WAGMI].address, PNG[ChainId.WAGMI].address]
}

export const SWAP_DEFAULT_CURRENCY = {
  [ChainId.WAGMI]: {
    inputCurrency: 'WGM',
    outputCurrnecy: ''
  },
  [ChainId.FUJI]: {
    inputCurrency: '',
    outputCurrnecy: ''
  }
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  GNOSISSAFE: {
    connector: gnosisSafe,
    name: 'Gnosis Safe',
    iconName: 'gnosis_safe.png',
    description: 'Gnosis Safe Multisig Wallet.',
    href: null,
    color: '#010101'
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5'
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'Wallet Connect',
    iconName: 'walletConnectIcon.svg',
    description: 'Use Wallet Connect',
    href: null,
    color: '#315CF5'
  }
}

export const NetworkContextName = 'NETWORK'

export const WAGMI_CHAIN_PARAMS = {
  chainId: '0x2B67', // A 0x-prefixed hexadecimal chainId
  chainName: 'Wagmi Mainnet',
  nativeCurrency: {
    name: 'Wagmi',
    symbol: 'WGM',
    decimals: 18
  },
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://snowtrace.io//']
}

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 60 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 60

export const BIG_INT_ZERO = JSBI.BigInt(0)
export const BIG_INT_ONE = JSBI.BigInt(1)
export const BIG_INT_TWO = JSBI.BigInt(2)
export const BIG_INT_TEN = JSBI.BigInt(10)
export const BIG_INT_EIGHTEEN = JSBI.BigInt(18)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))

export const WYRE_API_KEY = process.env.REACT_APP_WYRE_API_KEY ? process.env.REACT_APP_WYRE_API_KEY : ''
export const WYRE_SECRET_KEY = process.env.REACT_APP_WYRE_SECRET_KEY ? process.env.REACT_APP_WYRE_SECRET_KEY : ''
export const WYRE_ID = process.env.REACT_APP_WYRE_ID ? process.env.REACT_APP_WYRE_ID : ''
export const WYRE_API_URL = 'https://api.sendwyre.com'
export const WYRE_QUOTE_API_ENDPOINT = '/v3/orders/quote/partner'
export const WYRE_RESERVE_API_ENDPOINT = '/v3/orders/reserve'
export const WYRE_CALLBACK_URL = 'https://app.pangolin.exchange/'

export const IS_IN_IFRAME = window.parent !== window
export const TIMEFRAME = [
  {
    description: 'HOUR',
    label: '1H',
    interval: 60,
    momentIdentifier: 'hour'
  },
  {
    description: 'DAY',
    label: '1D',
    interval: 3600,
    momentIdentifier: 'day'
  },
  {
    description: 'WEEK',
    label: '1W',
    interval: 86400,
    momentIdentifier: 'week'
  },
  {
    description: 'MONTH',
    label: '1M',
    interval: 604800,
    momentIdentifier: 'month'
  },
  {
    description: 'YEAR',
    label: '1Y',
    interval: 2629746,
    momentIdentifier: 'year'
  },
  {
    description: 'ALL',
    label: 'ALL',
    interval: 2629746,
    momentIdentifier: ''
  }
]


/*
 * Mapping between symbol (uppercase string) and CoinGecko coin id (string)
 * Using CoinGecko API: https://api.coingecko.com/api/v3/coins/list
 */
export const COIN_ID_OVERRIDE = {
  NEKO: undefined,
  VEE: undefined,
}