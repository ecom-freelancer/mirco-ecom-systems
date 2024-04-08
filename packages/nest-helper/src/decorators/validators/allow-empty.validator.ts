import { ValidateIf, ValidationOptions } from 'class-validator';

export function AllowEmpty(validationOptions?: ValidationOptions) {
  return ValidateIf((obj, value) => {
    return value !== null && value !== undefined && value !== '';
  }, validationOptions);
}
