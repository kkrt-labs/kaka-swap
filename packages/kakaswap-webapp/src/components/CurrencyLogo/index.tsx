import { Currency, ETHER, Token } from '@uniswap/sdk';
import { useMemo } from 'react';
import styled from 'styled-components';

import EthereumLogo from '../../assets/images/ethereum-logo.png';
import { DEFAULT_TOKEN_LIST } from '../../constants/lists';
import Logo from '../Logo';

const getTokenLogoURL = (address: string) => {
  return (
    DEFAULT_TOKEN_LIST.tokens
      .filter((token) => token.address.toLowerCase() === address.toLowerCase())
      .map((token) => token.logoURI)
      .pop() || `https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/${address}/logo.png`
  );
};

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`;

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.white};
`;

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
}: {
  currency?: Currency;
  size?: string;
  style?: React.CSSProperties;
}) {
  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return [];

    if (currency instanceof Token) {
      return [getTokenLogoURL(currency.address)];
    }
    return [];
  }, [currency]);

  if (currency === ETHER) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />;
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />;
}
