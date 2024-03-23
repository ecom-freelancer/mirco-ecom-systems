import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const SessionId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return (request as any)['sessionId'];
  },
);
