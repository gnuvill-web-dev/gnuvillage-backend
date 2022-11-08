import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<void> {
    return await this.authService.login(dto);
  }

  @Get('logout')
  async logout(@Body() dto: LoginDto): Promise<void> {
    await this.authService.logout();
  }
}
