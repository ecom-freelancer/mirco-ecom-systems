import Image from 'next/image';

export interface OnlyLogoProps {
  size?: number;
}

export const OnlyLogo: React.FC<OnlyLogoProps> = ({ size = 40 }) => {
  return (
    <Image
      src="/only_logo.png"
      alt="logo"
      width={size}
      height={size}
      priority
      className="logo"
    />
  );
};
