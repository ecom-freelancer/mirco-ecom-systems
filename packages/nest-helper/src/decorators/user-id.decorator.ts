import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return (request.headers as any)['userId'];
  },
);
