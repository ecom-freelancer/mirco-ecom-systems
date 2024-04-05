import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

const flatten = (errors: ValidationError[]): Array<ValidationError> => {
  if (!errors) return [];
  return errors.reduce((acc, error) => {
    if (error.children && error.children.length) {
      const childFlatten = flatten(error.children);
      return [...acc, error, ...childFlatten];
    }
    return [...acc, error];
  }, []);
};

export const classValidatorException = (errors: ValidationError[]) => {
  // flat errors
  const errorFlatten = flatten(errors);

  const mapErrors = errorFlatten.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.property]: Object.values(curr.constraints || {}),
    }),
    {},
  );

  const errConstraint = errorFlatten.find(
    (error) => Object.values(error.constraints || {}).length > 0,
  );

  const message = Object.values(errConstraint.constraints || {}).shift();

  return new BadRequestException(message, {
    cause: mapErrors,
  });
};
