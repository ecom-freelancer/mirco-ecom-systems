import { CoppyRight, MainFooter } from '../components/footer';

export interface AppFooterProps {}

export const AppFooter: React.FC<AppFooterProps> = () => {
  return (
    <footer>
      <MainFooter />
      <CoppyRight />
    </footer>
  );
};
