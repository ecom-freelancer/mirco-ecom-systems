'use client';

import { PersonalInfomation } from '@/modules/account/containers';
import { EmailInfomation } from '@/modules/account/containers/EmailAddessInfo';
import { PasswordInfomation } from '@/modules/account/containers/PasswordInfo';
import { Section } from '@/modules/layout/components/Section';
import { Box, Heading } from '@packages/ds-core';

export default function ProfilePage() {
  return (
    <div>
      <Box marginBottom="s16">
        <Heading type="h3"> My details</Heading>
      </Box>
      {/* 
      - personal infomation
      - E-mail address
      - password
       */}

      <Section title="Personal Infomation">
        <PersonalInfomation />
      </Section>
      <Section title="E-mail Address">
        <EmailInfomation />
      </Section>
      <Section title="Password">
        <PasswordInfomation />
      </Section>
    </div>
  );
}
