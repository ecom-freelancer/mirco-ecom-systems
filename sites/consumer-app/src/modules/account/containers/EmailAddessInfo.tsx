'use client';

import { Col, Row } from 'antd';
import { EmailForm } from '../components';
import { Text } from '@packages/ds-core';
import { useAuthContext } from '@/modules/auth/auth-context';

export const EmailInfomation: React.FC = () => {
  const { user } = useAuthContext();
  return (
    <Row gutter={[16, 16]}>
      <Col span={9}>
        <Text color="textSecondary">
          We are committed to absolutely protecting user informations.
        </Text>
      </Col>
      <Col span={15}>
        <Col span={18}>
          <EmailForm user={user!} />
        </Col>
      </Col>
    </Row>
  );
};
