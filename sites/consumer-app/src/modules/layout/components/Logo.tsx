import Image from 'next/image';

export const Logo = () => {
  return (
    <Image
      src="/logo.png"
      alt="logo"
      width={276}
      height={46}
      priority
      className="logo"
    />
  );
};
