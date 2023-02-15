// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [];

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [];

export const DEFAULT_TOKEN_LIST = {
  name: 'KakaSwap Default List',
  timestamp: '2023-02-15T23:57:10.982Z',
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  tags: {},
  logoURI: '',
  keywords: ['kakaswap', 'default'],
  tokens: [
    {
      name: 'Zeni',
      address: '0x82BcaCd36deA496C4F90B5FfA2347380a7C265d1',
      symbol: 'ZN',
      decimals: 18,
      chainId: 5,
      logoURI: require('../assets/images/zeni_token.png'),
    },
    {
      name: 'Wrapped Ether',
      address: '0x98159B3bb5E04F1b11c4967B1de81329CD3C8345',
      symbol: 'WETH',
      decimals: 18,
      chainId: 5,
      logoURI:
        'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
    {
      name: 'Zeni',
      address: '0x69AF21eF850a9f0B0303c239C87b765d1664C60C',
      symbol: 'ZN',
      decimals: 18,
      chainId: 59140,
      logoURI: require('../assets/images/zeni_token.png'),
    },
    {
      name: 'Wrapped Ether',
      address: '0xBf44988fa2ED7C8C3a28af2dB13F75765258459a',
      symbol: 'WETH',
      decimals: 18,
      chainId: 59140,
      logoURI:
        'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
  ],
};
