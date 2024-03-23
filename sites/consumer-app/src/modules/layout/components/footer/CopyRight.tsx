'use client';

import { Col, Row } from 'antd';
import { Container } from '../Contatiner';
import { Box, Flex, Text, styled } from '@packages/ds-core';
import {
  FaCcJcb,
  FaCcMastercard,
  FaCcVisa,
  FaFacebookMessenger,
  FaFacebookSquare,
  FaRegCreditCard,
  FaTelegram,
} from 'react-icons/fa';

interface TargetItem {
  image?: React.ReactNode;
  url?: string;
  description?: string;
}

const paymentMethods: TargetItem[] = [
  {
    description: 'creadit card',
    image: <FaRegCreditCard size={20} />,
  },
  {
    description: 'visa card',
    image: <FaCcVisa size={20} />,
  },
  {
    description: 'master card',
    image: <FaCcMastercard size={20} />,
  },
  {
    description: '',
    image: <FaCcJcb size={20} />,
  },
];

const socialLinks: TargetItem[] = [
  {
    description: 'Facebook',
    image: <FaFacebookSquare color="#4267B2" size={20} />,
  },
  {
    description: 'Messenger',
    image: <FaFacebookMessenger color="#00B2FF" size={20} />,
  },
  {
    description: 'Telegram',
    image: <FaTelegram color="#229ED9" size={20} />,
  },
];

export interface CopyRightProps {}
export const CoppyRight: React.FC<CopyRightProps> = () => {
  return (
    <Wrapper padding={['s10', 0]}>
      <Container>
        <Row gutter={[8, 8]} align="middle">
          <Col span={24} lg={12}>
            <Flex justify="center">
              <Text color="textPrimary">
                © 2021 PREMIUMKEY LIMITED. All rights reserved.
              </Text>
            </Flex>
          </Col>
          <Col span={24} lg={12}>
            <Flex
              gapX="s16"
              gapY="s4"
              align="stretch"
              justify="center"
              flexWrap="wrap"
            >
              <Flex align="center" gapX="s16">
                {paymentMethods.map((item, index) => (
                  <Box paddingTop="s2" key={index}>
                    {item.image}
                  </Box>
                ))}
              </Flex>
              <Line />
              <Flex align="center" gapX="s16">
                {socialLinks.map((item, index) => (
                  <Box paddingTop="s2" key={index}>
                    <Flex gapX="s8" align="center">
                      {item.image}
                      <Text color="blueGray">{item.description}</Text>
                    </Flex>
                  </Box>
                ))}
              </Flex>
            </Flex>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled(Box)``;

const Line = styled.div`
  width: 2px;
  background-color: black;
`;
