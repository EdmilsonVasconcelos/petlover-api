import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export class UserIdGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const requestBodyUserId = request.body.id;
    const requestParamsUserId = request.params?.id;
    const requestHeadersUserId = request.headers?.ownerId;

    const userFromToken = request.user;
    const isPublic = request.isPublic;

    const isValidUserIdBody =
      Number(userFromToken?.id) === Number(requestBodyUserId);

    const isValidUserIdRequestParams =
      Number(userFromToken?.id) === Number(requestParamsUserId);

    const isValidUserIdHeaders =
      Number(userFromToken?.id) === Number(requestHeadersUserId);

    if (!isPublic && requestParamsUserId && !isValidUserIdRequestParams) {
      throw new UnauthorizedException();
    }

    if (!isPublic && requestBodyUserId && !isValidUserIdBody) {
      throw new UnauthorizedException();
    }

    if (!isPublic && requestHeadersUserId && !isValidUserIdHeaders) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
