import {
  CanActivate,
  ExecutionContext,
  // ForbiddenException,
  Injectable,
} from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    return req.isAuthenticated();
  }
}

// @Injectable()
// export class GraphQLAuthGuard implements CanActivate {
//   async canActivate(context: ExecutionContext) {
//     const ctx = GqlExecutionContext.create(context);
//     const isAuthenticated = ctx.getContext().req.isAuthenticated();

//     if (!isAuthenticated) {
//       throw new ForbiddenException(
//         'Você não tem permissão para realizar esta ação',
//       );
//     }

//     return isAuthenticated;
//   }
// }
