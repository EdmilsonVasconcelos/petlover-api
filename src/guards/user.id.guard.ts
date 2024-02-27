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
    const requestHeadersUserId = request.headers?.ownerid;

    const userFromToken = request.user;
    const isPublic = request.isPublic;

    const isValidUserIdRequestParams =
      Number(userFromToken?.id) === Number(requestParamsUserId);

    const isValidUserIdBody =
      Number(userFromToken?.id) === Number(requestBodyUserId);

    const isValidUserIdHeaders =
      Number(userFromToken?.id) === Number(requestHeadersUserId);

    if (!isPublic && requestParamsUserId && !isValidUserIdRequestParams) {
      throw new UnauthorizedException(
        'Você não tem permissão para acessar este recurso',
      );
    }

    if (!isPublic && requestBodyUserId && !isValidUserIdBody) {
      throw new UnauthorizedException(
        'Você não tem permissão para acessar este recurso',
      );
    }

    if (!isPublic && requestHeadersUserId && !isValidUserIdHeaders) {
      throw new UnauthorizedException(
        'Você não tem permissão para acessar este recurso',
      );
    }

    return true;
  }
}
