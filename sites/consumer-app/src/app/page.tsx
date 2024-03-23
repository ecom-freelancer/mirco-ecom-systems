import { FeatureCommingSoon } from '@/modules/layout/components/FeatureCommingSoon';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return <FeatureCommingSoon />;
}
