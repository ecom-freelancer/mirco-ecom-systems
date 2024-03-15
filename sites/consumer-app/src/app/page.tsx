import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <main>
      This is main home page content , you are seeing this because you are not
      logged in
    </main>
  );
}
