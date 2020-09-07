import {
  Controller,
  UseGuards,
  Post,
  Body
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from '@src/models/auth/auth-login.model';
import { RegisterDto } from '@src/models/auth/auth-register.model';
import { Modules } from '@src/common/decorators/modules.decorator';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import { AuthService } from './auth.service';
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

}
