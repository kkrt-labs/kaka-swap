import ZENI_LOGO from '../assets/images/zeni_token.png';

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [];

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [];

export const DEFAULT_TOKEN_LIST = {
  name: 'KakarotSwap Default List',
  timestamp: '2023-02-15T23:57:10.982Z',
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  tags: {},
  logoURI: '',
  keywords: ['kakarotswap', 'default'],
  tokens: [
    {
      name: 'Zeni',
      address: '0x1613beB3B2C4f22Ee086B2b38C1476A3cE7f78E8',
      symbol: 'ZN',
      decimals: 18,
      chainId: 5,
      logoURI: ZENI_LOGO,
    },
    {
      name: 'Wrapped Ether',
      address: '0xf5059a5D33d5853360D16C683c16e67980206f36',
      symbol: 'WETH',
      decimals: 18,
      chainId: 5,
      logoURI:
        'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
    {
      name: 'Zeni',
      address: '0x1613beB3B2C4f22Ee086B2b38C1476A3cE7f78E8',
      symbol: 'ZN',
      decimals: 18,
      chainId: 59140,
      logoURI: ZENI_LOGO,
    },
    {
      name: 'Wrapped Ether',
      address: '0xf5059a5D33d5853360D16C683c16e67980206f36',
      symbol: 'WETH',
      decimals: 18,
      chainId: 59140,
      logoURI:
        'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
    {
      name: 'Zeni',
      address: '0x851356ae760d987E095750cCeb3bC6014560891C',
      symbol: 'ZN',
      decimals: 18,
      chainId: 31337,
      logoURI: ZENI_LOGO,
    },
    {
      name: 'Wrapped Ether',
      address: '0xf5059a5D33d5853360D16C683c16e67980206f36',
      symbol: 'WETH',
      decimals: 18,
      chainId: 31337,
      logoURI:
        'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
  ],
};
