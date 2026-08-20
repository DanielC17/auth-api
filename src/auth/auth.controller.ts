import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import type { SignInDTO, SignUpDTO } from './dtos/auth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignUpDTO) {
    return await this.authService.signUp(body);
  }

  @Post('signin')
  async signin(@Body() body: SignInDTO) {
    return await this.authService.signIn(body);

  }
}
