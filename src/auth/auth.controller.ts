import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import type { SignInDTO, SignUpDTO } from './dtos/auth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignUpDTO) {
    const data = await this.authService.signUp(body);
    return data;
  }

  @Post('signin')
  async signin(@Body() body: SignInDTO) {
    await this.authService.signIn(body);
    return body;
  }
}
