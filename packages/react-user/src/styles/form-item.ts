import { styled } from '@packages/ds-core';
import FormItem from 'antd/es/form/FormItem';

export const StyledFormItem = styled(FormItem)`
  margin-bottom: 1rem;
  .ant-form-item-explain-error {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    margin-bottom: 0.5rem;
    margin-top: 0.25rem;
  }
`;
