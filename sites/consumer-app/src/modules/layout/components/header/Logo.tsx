import Image from 'next/image';

export const Logo = () => {
  return <Image src="/logo.svg" alt="logo" width={120} height={50} priority />;
};
