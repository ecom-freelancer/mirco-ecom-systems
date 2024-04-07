import { Box, Flex, styled } from '@packages/ds-core';
import { VariantLineItem } from '../components';
import { IVariant } from '../types.ts/variant';

export interface ListVariantsProps {
  className?: string;
  variants?: IVariant[];
  loading?: boolean;
  onClickEdit?: (variant: IVariant) => void;
}

export const ListVariants: React.FC<ListVariantsProps> = ({
  className,
  variants,
  loading,
  onClickEdit,
}) => {
  if (loading) {
    return <div className={className}>Loading...</div>;
  }

  if (!variants?.length) {
    return <div className={className}>No variants found</div>;
  }

  return (
    <Wrapper className={className}>
      <Flex direction="column">
        {variants.map((variant) => (
          <VariantLineItem
            variant={variant}
            key={variant.id}
            onEdit={() => onClickEdit?.(variant)}
          />
        ))}
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled(Box)``;

export default ListVariants;
