'use client';

import { redirect } from 'next/navigation';

export default function AccountPage() {
  return redirect('/account/profile');
}
