import { Box, Flex, Text, styled } from '@packages/ds-core';
import { Input } from 'antd';
import React, { useMemo } from 'react';
import { IoCheckmark } from 'react-icons/io5';

export interface PasswordInputAsyncProps {
  value?: string;
  rules: InputRule[];
}

export const PasswordWithRules: React.FC<PasswordInputAsyncProps> = ({
  rules,
  ...props
}) => {
  const { value } = props;

  return (
    <React.Fragment>
      <StyledInputPassword {...props} />
      <Box marginTop="s12">
        <Flex direction="column">
          {rules.map((rule) => (
            <Message rule={rule} value={value} />
          ))}
        </Flex>
      </Box>
    </React.Fragment>
  );
};

const Message: React.FC<{ rule: InputRule; value: any }> = ({
  rule,
  value,
}) => {
  const validated = useMemo(() => {
    return rule.validate(value);
  }, [rule, value]);

  return (
    <Flex align="start" gapX="s6">
      <Text color={validated ? 'success' : 'textSecondary'}>
        <IoCheckmark />
      </Text>
      <Text color={validated ? 'success' : 'textSecondary'} fontSize="xs">
        {rule.message}
      </Text>
    </Flex>
  );
};

export interface InputRule {
  message: string;
  validate: (value: string) => boolean;
}

const StyledInputPassword = styled(Input.Password)`
  background-color: rgb(245, 248, 253) !important;
  border: none;
  padding: 0.45rem 0.45rem;

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px rgb(245, 248, 253) inset !important;
  }

  :focus-within {
    border: none;
    box-shadow: none;
  }

  input:placeholder {
    font-size: ${({ theme }) => theme.fontSizes.s} !important;
  }
`;
