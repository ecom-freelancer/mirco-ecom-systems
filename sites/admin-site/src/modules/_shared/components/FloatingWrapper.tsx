import { styled } from '@packages/ds-core';

const Wrapper = styled.div`
  position: fixed;
  bottom: -10px;
  right: 30px;
`;

// might want to add some more position props soon
const FloatingWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default FloatingWrapper;
