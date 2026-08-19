import { Injectable } from '@nestjs/common';
import type { SignUpDTO, SignInDTO } from './dtos/auth';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(data: SignUpDTO) {
    const newUser = await this.prisma.user.create({ data });
    if(newUser.id) {
      console.log('User created successfully:', newUser);
      return newUser;
    }
    return null;
  }

  async signIn(data: SignInDTO) {
    const user = 'teste';
    return user;
  }
}
