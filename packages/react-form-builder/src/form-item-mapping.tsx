import { AllowConfig, BaseFormItemProps, IFormItemTypeType } from './types';
import { FormItemCheckBox } from './form-items/FormItemCheckbox';
import { FormItemInput } from './form-items/FormItemInput';
import { FormItemInputPassword } from './form-items/FormItemInputPassword';
import { FormItemCheckBoxGroup } from './form-items/FormCheckBoxGroup';
import { FormItemDatePicker } from './form-items/FormDatePicker';
import { FormItemSelect } from './form-items/FormItemSelect';
import { FormItemTimePicker } from './form-items/FormItemTimePicker';
import { FormItemSwitch } from './form-items/FormItemSwitch';
import { FormItemSlider } from './form-items/FormItemSlider';
import { FormItemRadioGroup } from './form-items/FormItemRadioGroup';

export type FormItemMapping = Partial<
  Record<IFormItemTypeType, React.FC<BaseFormItemProps<AllowConfig<any, any>>>>
>;

export const formItemMappings: FormItemMapping = {
  input: FormItemInput,
  password: FormItemInputPassword,
  date: FormItemDatePicker,
  select: FormItemSelect,
  time: FormItemTimePicker,
  switch: FormItemSwitch,
  slider: FormItemSlider,
  checkbox: FormItemCheckBox,
  'checkbox-group': FormItemCheckBoxGroup,
  radio: FormItemRadioGroup,
};
