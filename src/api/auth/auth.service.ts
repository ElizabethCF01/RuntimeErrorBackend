import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JWTPayload } from './jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.userService.getUserByEmail(email);
    if(user){
    return await user.validatePassword(password);
    }
    throw new NotFoundException(`No encontramos el usuario ${email}`)
  }

  async generateAccessToken(email: string) {
    const user = await this.userService.getUserByEmail(email);
    const payload: JWTPayload = { id: user.id};
    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }
}