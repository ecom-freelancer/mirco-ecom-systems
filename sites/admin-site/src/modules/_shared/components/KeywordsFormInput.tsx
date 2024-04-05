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
    return debounce((v: string[]) => {
      onChange?.(v);
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Select
      mode="tags"
      value={value}
      tokenSeparators={[',']}
      onChange={handleChange}
      maxLength={10}
    />
  );
};
