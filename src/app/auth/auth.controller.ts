import {
  Controller,
  Post,
  Body, BadRequestException
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from '@src/models/auth/auth-login.model';
import { RegisterPhoneDto } from '@src/models/auth/auth-register-phone.model';
import { RegisterDto } from '@src/models/auth/auth-register.model';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('register-phone')
  async registerPhone(@Body() body: RegisterPhoneDto) {
    return this.authService.registerPhone(body);
  }

  @Post('reset-password')
  async resetPassword(@Body() { password: string }) {}

}
