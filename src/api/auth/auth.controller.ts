import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() loginDTO: LoginDTO): Promise<{ access_token: string }> {
    const { email, password } = loginDTO;
    const valid = await this.authService.validateUser(email, password);
    if (!valid) {
      throw new UnauthorizedException();
    }
    return await this.authService.generateAccessToken(email);
  }
}