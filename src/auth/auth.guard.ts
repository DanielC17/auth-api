import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private logger: Logger) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest(); // acesso a req

    const token = this.#extractTokenFromHeader(request);

    if (!token) {
      this.logger.error('Token not provided in request headers');
      throw new Error();
    }

    try {
      this.logger.log('Verifying token:', token);
      request['user'] = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch {
      this.logger.error('Invalid token provided');
      throw new Error();
    }

    this.logger.log('Token verified successfully for user:', request['user']);
    return true;
  }

  private #extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers['authorization']?.split(' ') ?? []; // Desestruturação do header Authorization para pegar token
    return type === 'Bearer' ? token : null;
  }
}
