import { Select } from 'antd';
import { debounce } from 'lodash';
import { useMemo } from 'react';

export interface KeywordsFormInputProps {
  value?: string[];
  onChange?: (value?: string[]) => void;
}

export const KeywordsFormInput: React.FC<KeywordsFormInputProps> = ({
  value,
  onChange,
}) => {
  const handleChange = useMemo(() => {
    return debounce((v: string) => {
      onChange?.(v.split(','));
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectValue = value?.join(',');
  return (
    <Select
      mode="tags"
      value={selectValue}
      tokenSeparators={[',']}
      onChange={handleChange}
      maxLength={10}
    />
  );
};
