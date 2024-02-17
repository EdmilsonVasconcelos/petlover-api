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
    const userFromToken = request.user;
    const isPublic = request.isPublic;

    const isValidUserIdBody =
      Number(userFromToken?.id) === Number(requestBodyUserId);

    const isValidUserIdRequestParams =
      Number(userFromToken?.id) === Number(requestParamsUserId);

    if (!isPublic && requestParamsUserId && !isValidUserIdRequestParams) {
      throw new UnauthorizedException();
    }

    if (!isPublic && requestBodyUserId && !isValidUserIdBody) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
