'use client';

import { styled } from '@packages/ds-core';
import { AccountMenu } from '../components/AccountMenu';
import { Col, Row } from 'antd';

export interface AccountLayoutProps {
  children: React.ReactNode;
}

export const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  return (
    <Row gutter={[32, 32]}>
      <Col span={6} md={8} lg={6}>
        <AccountMenu />
      </Col>
      <Col span={18} md={16} lg={18}>
        <ContentWrapper>{children}</ContentWrapper>
      </Col>
    </Row>
  );
};

const ContentWrapper = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.25rem;
  margin-top: -20px;

  -webkit-box-shadow: 0px 0px 4px -2px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0px 0px 4px -2px rgba(0, 0, 0, 0.24);
  box-shadow: 0px 0px 4px -2px rgba(0, 0, 0, 0.24);
`;
