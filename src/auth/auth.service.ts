import { Injectable } from '@nestjs/common';
import type { SignUpDTO, SignInDTO } from './dtos/auth';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(data: SignUpDTO) {
    const verifyUserExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (verifyUserExists) {
      console.log('User already exists:', verifyUserExists);
      return null;
    }

    console.log('Creating new user with data:', data);
    const passwordHash = await bcrypt.hash(data.password, 10);

    const newUser = await this.prisma.user.create({data: { ...data, password: passwordHash }});
    if (newUser) {
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
