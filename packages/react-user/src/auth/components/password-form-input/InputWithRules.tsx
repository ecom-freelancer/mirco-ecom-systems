import { Box, Flex, Text } from '@packages/ds-core';
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
      <Box marginTop="s12">
        <Flex direction="column">
          {rules.map((rule, index) => (
            <Message rule={rule} value={value} key={index} />
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
