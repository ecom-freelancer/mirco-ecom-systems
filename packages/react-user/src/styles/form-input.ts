import { css } from '@packages/ds-core';

export const formInputCss = css`
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

  input::placeholder,
  ::placeholder {
    font-size: 13px;
  }
`;
