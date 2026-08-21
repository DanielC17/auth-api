import { Injectable } from '@nestjs/common';
import type { SignUpDTO, SignInDTO } from './dtos/auth';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDTO) {
    const verifyUserExists = await this.#userExists(data.email);
    if (verifyUserExists) {
      throw new Error('User already exists');
    }

    console.log('Creating new user with data:', data);
    const passwordHash = await bcrypt.hash(data.password, 10);

    const newUser = await this.prisma.user.create({
      data: { ...data, password: passwordHash },
    });
    if (newUser) {
      console.log('User created successfully:', newUser);
      return newUser;
    }

    return null;
  }

  async signIn(data: SignInDTO) {
    const user = await this.#userExists(data.email);
    if (!user) {
      throw new Error('Incorrect email or password');
    }

    const passwordValid = await bcrypt.compare(data.password, user.password);
    if (!passwordValid) {
      throw new Error('Incorrect email or password');
    }

    const accessToken = this.jwtService.sign({
      userId: user.id,
      email: user.email,
      name: user.name,
    });
    console.log('User signed in successfully:', user.email);

    const result = {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };

    return result;
  }

  async #userExists(email: string) {
    const verifyUserExists = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (verifyUserExists) {
      console.log('User already exists:', verifyUserExists);
      return verifyUserExists;
    }
    return false;
  }
}
