import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IdentitiesService } from 'features/identities/identities.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly identityService: IdentitiesService,
  ) {}


  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (roles && roles.includes('all')) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const headers = request.headers;

    if (!headers) {
      return false;
    }

    const auth: string = headers.authentication || headers.authorization;
    if (!auth) {
      return false;
    }

    const [key, token] = auth.split(' ');

    if (key !== 'Bearer' || !token || token === 'null') {
      return false;
    }

    try {
      let identity = await this.identityService.verifyIdentity(token);

      if (!identity || identity === "invalid-token" || identity === "no-identity") {
        identity = await this.identityService.getIdentityForApiKey(token);

        if (!identity) {
          return false;
        }
      }

      request.principal = identity;

      return true;
    } catch {
      return false;
    }
  }
}
