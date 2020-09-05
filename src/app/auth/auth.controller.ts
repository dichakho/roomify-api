import {
  Controller,
  UseGuards,
  Post,
  Request,
  Body,
  Get
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDTO } from '@src/models/auth/auth-login.model';
import { RegisterDto } from '@src/models/auth/auth-register.model';
import { Methods } from '@src/common/decorators/methods.decorator';
import { Modules } from '@src/common/decorators/modules.decorator';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '@src/common/guards/jwt-auth.guard';
@Modules('Auth')
@ApiTags('v1/auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    const { user } = req;
    user.role = user.roles[0].name;
    user.roles = undefined;
    user.permissions = undefined;
    return user;
  }
}
