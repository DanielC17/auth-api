import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async signUp(data: singUpDTO) {
    console.log(data);
    return 'User signed up successfully';
  }

  async signIn(data: signInDTO) {
    console.log(data);
    return 'User signed in successfully';
  }
}
