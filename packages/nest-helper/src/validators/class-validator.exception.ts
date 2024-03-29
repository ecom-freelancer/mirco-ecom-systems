import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const classValidatorException = (errors: ValidationError[]) => {
  const mapErrors = errors.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.property]: Object.values(curr.constraints || {}),
    }),
    {},
  );

  const message = mapErrors ? mapErrors[Object.keys(mapErrors)[0]]?.[0] : '';
  return new BadRequestException(message, {
    cause: mapErrors,
  });
};
