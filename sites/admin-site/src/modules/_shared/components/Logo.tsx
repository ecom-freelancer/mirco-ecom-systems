import { styled } from '@packages/ds-core';

export interface LogoProps {
  size?: 'small' | 'large';
}

export const Logo: React.FC<LogoProps> = () => {
  return <StyleLogo src="/logo.svg" />;
};

const StyleLogo = styled.img<LogoProps>`
  object-fit: cover;
  max-width: 100%;
  height: ${({ size }) => (size === 'small' ? '20px' : '30px')};
`;
