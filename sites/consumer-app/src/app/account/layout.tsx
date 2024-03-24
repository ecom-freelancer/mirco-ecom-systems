'use client';

import { AccountLayout } from '@/modules/account/containers';
import { useAuthContext } from '@/modules/auth/auth-context';
import { Center } from '@/modules/layout/components/Center';
import { PageLayout } from '@/modules/layout/containers/PageLayout';
import { redirect } from 'next/navigation';

export default function Layout({ children }) {
  const { loading, user } = useAuthContext();

  if (loading) {
    return <Center> Loadding ...</Center>;
  }

  if (!user) {
    return redirect('/');
  }

  return (
    <PageLayout
      title="My Account"
      breadcrumbs={[
        {
          label: 'Homepage',
          href: '/',
          disabled: true,
        },
        {
          label: 'My Account',
          href: '/account',
        },
      ]}
    >
      <AccountLayout> {children}</AccountLayout>
    </PageLayout>
  );
}
