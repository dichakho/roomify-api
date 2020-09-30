import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '@src/app/user/user.service';
import { JwtService } from '@nestjs/jwt';
import Bcrypt from '@src/plugins/bcrypt.plugin';
import { RegisterDto } from '@src/models/auth/auth-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/entities/user.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { LoginDTO } from '@src/models/auth/auth-login.dto';
import { RegisterPhoneDto } from '@src/models/auth/auth-register-phone.dto';

@Injectable()
export class AuthService extends TypeOrmCrudService<User>{
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User) repository
  ) {
    super(repository);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (!user) throw new BadRequestException('Wrong credentials provided');
    const isPasswordMatching = await Bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong credentials provided');
    }
    return user;

  }

  async login(user: LoginDTO) {
    const result = await this.validateUser(user.username, user.password);
    const payload = { username: result.username, id: result.id };
    const token = this.jwtService.sign(payload);
    return {
      token,
      id: result.id,
      username: result.username,
      fullName: result.fullName,
      email: result.email,
      phone: result.phone,
      avatar: result.avatar,
      status: result.status,
      role: result.roles
    };
  }

  async register(userRegister: RegisterDto): Promise<void> {
    const user = {
      fullName: userRegister.fullName,
      password: userRegister.password,
      phone: userRegister.phone,
      username: userRegister.username
    };
    const result = await this.repo.save({ ...user, roles: [{ id: 4 }] });
    console.log('RESULT', result);

  }

  async registerPhone(userRegister: RegisterPhoneDto): Promise<void> {
    const user = {
      fullName: userRegister.fullName,
      password: userRegister.password,
      phone: userRegister.phone
    };
    const result = await this.repo.save({ ...user, roles: [{ id: 4 }] });
    console.log('RESULT', result);
  }

}
