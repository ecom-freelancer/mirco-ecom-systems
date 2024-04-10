import { Box, Flex, Text, styled } from '@packages/ds-core';
import { Color } from '@packages/ds-core/dist/theme/token';
import { Button, Col, Row } from 'antd';
import { Page } from 'modules/_shared/components/Page';
import {
  ListImportHistory,
  ListInventoryEntities,
} from 'modules/product-detail/containers';
import { useSkuInventories } from 'modules/product-detail/hooks/useSkuInventories';
import { InventoryStatus } from 'modules/product-detail/types/inventory';
import React from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { useParams } from 'react-router';

const SkuInventoryPage: React.FC = () => {
  const { sku } = useParams<{ sku: string }>();

  const { statistic, loading } = useSkuInventories(sku!, {
    page: 1,
    pageSize: 10,
  });

  const total = statistic.reduce((acc, item) => acc + item.total, 0);

  const getCount = (status: string) => {
    return statistic.find((item) => item.status === status)?.total || 0;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Page
      title={`Inventory SKU (${sku})`}
      extra={[
        <Button type="primary" icon={<AiOutlineUpload />}>
          Import
        </Button>,
      ]}
    >
      <PageContent marginTop="s4">
        <Row gutter={[16, 14]} align={'stretch'}>
          <Col span={18}>
            <ListInventoryEntities sku={sku!} />
          </Col>
          <Col span={6}>
            <Statistic>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <StatisticBox color="primaryA50">
                    <Flex
                      align="center"
                      direction="column"
                      justify="center"
                      style={{ flex: 1 }}
                      gapY="s8"
                    >
                      <Box>
                        <Text fontSize="h3" fontWeight="bolder" color="primary">
                          {getCount(InventoryStatus.enable)}
                        </Text>
                      </Box>
                      <Box>Available</Box>
                    </Flex>
                  </StatisticBox>
                </Col>
                <Col span={12}>
                  <StatisticBox color="warningA50">
                    <Flex
                      align="center"
                      direction="column"
                      justify="center"
                      style={{ flex: 1 }}
                      gapY="s8"
                    >
                      <Box>
                        <Text fontSize="h3" fontWeight="bolder" color="warning">
                          {total}
                        </Text>
                      </Box>
                      <Box>Entities</Box>
                    </Flex>
                  </StatisticBox>
                </Col>
                <Col span={12}>
                  <StatisticBox color="successA100">
                    <Flex
                      align="center"
                      direction="column"
                      justify="center"
                      style={{ flex: 1 }}
                      gapY="s8"
                    >
                      <Box>
                        <Text fontSize="h3" fontWeight="bolder" color="success">
                          {getCount(InventoryStatus.sold)}
                        </Text>
                      </Box>
                      <Box>Sold</Box>
                    </Flex>
                  </StatisticBox>
                </Col>
                <Col span={12}>
                  <StatisticBox color="errorA50">
                    <Flex
                      align="center"
                      direction="column"
                      justify="center"
                      style={{ flex: 1 }}
                      gapY="s8"
                    >
                      <Box>
                        <Text fontSize="h3" fontWeight="bolder" color="error">
                          {getCount(InventoryStatus.draft)}
                        </Text>
                      </Box>
                      <Box>Disabled</Box>
                    </Flex>
                  </StatisticBox>
                </Col>
              </Row>
            </Statistic>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <ListImportHistory sku={sku!} />
          </Col>
        </Row>
      </PageContent>
    </Page>
  );
};

const PageContent = styled(Box)``;

const Statistic = styled(Box)`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 1rem;
  aspect-ratio: 1/1;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const StatisticBox = styled(Box)<{ color?: Color }>`
  aspect-ratio: 1/1;
  background-color: ${({ theme, color }) => theme.colors[color || 'light']};
  border-radius: 1rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
`;

export default SkuInventoryPage;
