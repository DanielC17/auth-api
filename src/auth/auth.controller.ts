import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import type { SignInDTO, SignUpDTO } from './dtos/auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('signup')
  async signup(@Body() body: SignUpDTO) {
    console.log(body);
    return body
  }

  @Post('signin')
  async signin(@Body() body: SignInDTO) {
    console.log(body);
  }

}
