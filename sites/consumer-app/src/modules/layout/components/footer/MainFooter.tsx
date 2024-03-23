'use client';

import { Flex, Heading, Text, styled } from '@packages/ds-core';
import { GrMapLocation } from 'react-icons/gr';
import { TfiEmail } from 'react-icons/tfi';

import React, { ReactNode } from 'react';
import { Container } from '../Contatiner';
import { Col, Row } from 'antd';
import { OnlyLogo } from '../OnlyLogo';

export interface IFooterBlock {
  title: string;
  items: Array<{
    image?: ReactNode;
    title?: string;
    url?: string;
  }>;
  line?: boolean;
}

const contactBlock: IFooterBlock = {
  title: 'Contact info',
  items: [
    {
      image: <OnlyLogo size={28} />,
      title: 'PREMIUMKEY LIMITED',
    },
    {
      image: (
        <Text
          color="primary"
          style={{
            minWidth: 28,
            textAlign: 'center',
          }}
        >
          <GrMapLocation size={24} />
        </Text>
      ),
      title:
        'HQ The Quadrant, 3 Warwick Road, The Quadrant, Coventry, West Midlands, CV1 2DY, UK',
    },
    {
      image: (
        <Text
          color="primary"
          style={{
            minWidth: 28,
            textAlign: 'center',
          }}
        >
          <TfiEmail size={24} />
        </Text>
      ),
      title: 'cs@premiumkey.co',
    },
  ],
};

const infomationBlock: IFooterBlock = {
  title: 'Information',
  line: true,
  items: [
    {
      title: 'About us',
    },
    {
      title: 'Delivery Information',
    },
    {
      title: 'Privacy Policy',
    },
    {
      title: 'Terms & Conditions',
    },
    {
      title: 'Payment Policy',
    },
    {
      title: 'Refund Policy',
    },
  ],
};

const serviceBlock: IFooterBlock = {
  title: 'Services',
  line: true,
  items: [
    {
      title: 'Cotact Us',
    },
    {
      title: 'Our New',
    },
    {
      title: 'Lookup Your Order',
    },
    {
      title: 'Terms & Conditions',
    },
    {
      title: 'Payment Policy',
    },
  ],
};

const FooterBlock: React.FC<IFooterBlock> = ({ title, items, line }) => {
  const [collapse, setCollaped] = React.useState(false);
  return (
    <div>
      <StyledHeading
        type="h5"
        color="primary"
        lineHeight="24px"
        onClick={() => setCollaped(!collapse)}
      >
        {title}
      </StyledHeading>
      <StyledList direction="column" gapY="s2" line={line}>
        {items.map((item, index) => {
          return (
            <Flex key={index} gapX="s24" align="center">
              {item.image}
              <Text lineHeight="24px">{item.title}</Text>
            </Flex>
          );
        })}
      </StyledList>
    </div>
  );
};

const StyledList = styled(Flex)<{ line?: boolean }>`
  padding-left: ${({ line }) => (line ? '1.5rem' : 0)};
  position: relative;

  ::after {
    content: '';
    border-left: 1px solid
      ${({ line, theme }) => (line ? theme.colors.lightA100 : 'none')};
    width: 1.5rem;
    top: 0;
    height: 100%;
    position: absolute;
    transform: translateX(25%);
    left: 0;
  }
`;

const StyledHeading = styled(Heading)`
  font-size: 16px;
  font-weight: 500 !important;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
`;

export const MainFooter = () => {
  return (
    <Wrapper>
      <Container>
        <Row gutter={[12, 12]}>
          <Col span={24} lg={10} md={12}>
            <FooterBlock {...contactBlock} />
          </Col>
          <Col span={24} lg={7} md={6}>
            <FooterBlock {...infomationBlock} />
          </Col>
          <Col span={24} lg={7} md={6}>
            <FooterBlock {...serviceBlock} />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.lightA500};
  padding-top: 1.5rem;
  padding-bottom: 1rem;
  font-size: 13px;
`;
