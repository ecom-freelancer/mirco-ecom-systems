import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  getSchemaPath,
  ApiResponse,
  ApiExtraModels,
} from '@nestjs/swagger';
import { ApiResponseDto } from '../interfaces';

export const ApiSuccessResponse = <DataDto extends Type<unknown>>(options: {
  type?: DataDto;
  status: number;
  message?: string;
}) =>
  applyDecorators(
    options.type
      ? ApiExtraModels(ApiResponseDto, options.type)
      : ApiExtraModels(ApiResponseDto),
    ApiOkResponse({
      status: options.status,
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(ApiResponseDto),
          },
          {
            properties: {
              ...(options.type
                ? {
                    data: {
                      $ref: getSchemaPath(options.type),
                    },
                  }
                : {}),
              ...{
                status: {
                  type: 'number',
                  description: 'Status code',
                  default: options.status,
                },
                message: {
                  type: 'string',
                  description: 'Status message',
                  default: options?.message,
                },
              },
            },
          },
        ],
      },
    }),
  );

export const ApiErrorResponse = (options: {
  status: number;
  message?: string;
}) =>
  applyDecorators(
    ApiResponse({
      status: options.status,
      schema: {
        properties: {
          status: {
            type: 'number',
            description: 'Status code',
            default: options.status,
          },
          message: {
            type: 'string',
            description: 'Error message',
          },
          errors: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: 'Error details',
          },
        },
      },
    }),
  );
