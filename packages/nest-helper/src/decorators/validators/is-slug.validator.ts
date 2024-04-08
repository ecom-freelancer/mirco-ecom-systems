import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsSlug(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsSlug',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,

      validator: {
        validate(value: any, args: ValidationArguments) {
          const pattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
          return typeof value === 'string' && pattern.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid slug`;
        },
      },
    });
  };
}
