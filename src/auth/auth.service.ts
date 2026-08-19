import { Injectable } from '@nestjs/common';
import type { SignInDTO, SignUpDTO } from './dtos/auth';

@Injectable()
export class AuthService {
  async signUp(data: SignUpDTO) {
    console.log(data);
    return 'User signed up successfully';
  }

  async signIn(data: SignInDTO) {
    console.log(data);
    return 'User signed in successfully';
  }
}
