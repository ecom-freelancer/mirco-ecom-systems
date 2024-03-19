import { Box, Flex, Heading, Text, styled } from '@packages/ds-core';
import { Button } from 'antd';
import React, { useRef } from 'react';

export interface VerifyOTPFormProps {
  onVerify: (otp: string) => void;
  loading?: boolean;
  onResend?: () => void;
  /**
   * email or phone number
   */
  target: string;

  digits: number;

  onResendOtp: () => void;

  resendLoading?: boolean;

  timeOut?: number;

  className?: string;

  type: 'text' | 'number';
}

const keyRegex = {
  number: /[0-9]{1}/,
  text: /[a-zA-Z0-9]{1}/,
};

export const VerifyOTPForm: React.FC<VerifyOTPFormProps> = ({
  className,
  target,
  digits,
  type,
}) => {
  const refs = useRef<HTMLInputElement[]>([]);

  const value = refs.current.map((ref) => ref.value).join('');

  const onKeyUp = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const key = event.key;
    if (key === 'Backspace') {
      if (index > 0) refs.current[index - 1].focus();
      return;
    }
    if (key === 'Enter' && index == digits - 1 && value.length == digits) {
    }

    if (key.length > 1) return;

    const pattern = keyRegex[type];
    if (pattern.test(key)) {
      refs.current[index].value = key;
      if (index < digits - 1) {
        refs.current[index + 1].focus();
      }
    } else {
    }
  };

  const onSubmit = () => {
    if (value.length === digits) {
      console.log(value);
    }
  };

  return (
    <Wrapper className={className}>
      <Flex justify="center" align="center" direction="column">
        <Heading type="h3"> OTP Verification</Heading>
        <Box>
          <Text color="textSecondary" fontSize="s">
            Enter the verification code we sent to
          </Text>
        </Box>
        <Box marginBottom="s12">
          <Text color="textPrimary" fontWeight="bold">
            {target}
          </Text>
        </Box>
      </Flex>

      <Box>
        <Box marginBottom="s8">
          <Text color="textSecondary" fontSize="s">
            Type {digits} digit security code
          </Text>
        </Box>
        <Flex gap="s16" justify="space-between">
          {Array(digits)
            .fill(undefined)
            .map((_, index) => {
              return (
                <InputWrapper key={index}>
                  <input
                    type={type}
                    autoFocus={index === 0}
                    maxLength={1}
                    ref={(ref) => (refs.current[index] = ref)}
                    onKeyUp={(event) => onKeyUp(index, event)}
                  />
                </InputWrapper>
              );
            })}
        </Flex>
      </Box>
      <Box marginTop="s16">
        <Flex align="center" gap="s6" justify="center">
          <Text fontSize="s" color="textSecondary">
            Didn't you receive the OTP?
          </Text>
          <ResendButton
            as="button"
            fontWeight="bold"
            color="primary"
            fontSize="s"
          >
            Resend OTP
          </ResendButton>
        </Flex>
      </Box>
      <Box marginTop="s16">
        <Flex justify="center">
          <StyledButton type="primary" onSubmit={onSubmit}>
            Verify
          </StyledButton>
        </Flex>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled(Box)``;

const ResendButton = styled(Text)`
  background-color: transparent !important;
  border: none;
  cursor: pointer;
`;

const InputWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.colors?.secondaryA100};
  width: 3rem;
  height: 3rem;
  border-radius: ${({ theme }) => theme.radius?.r8};

  :focus-within {
    background-color: ${({ theme }) => theme.colors?.primaryA100};
  }

  input {
    background-color: transparent;
    border: none;
    height: 100%;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes?.m};
    color: ${({ theme }) => theme.colors?.textPrimary};
    font-weight: bold;
    width: 100%;
    padding: 0;
    text-transform: uppercase;

    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }

    &:hover,
    &:active,
    &:focus,
    &:focus-visible {
      background-color: unset;
      border: none;
      box-shadow: none;
      outline: none;
    }
  }
`;

const StyledButton = styled(Button)`
  padding: 0 ${({ theme }) => theme.spaces?.s24};
`;
