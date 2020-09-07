import { Injectable, InternalServerErrorException, HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { UserService } from '@src/app/user/user.service';
import { JwtService } from '@nestjs/jwt';
import Bcrypt from '@src/plugins/bcrypt.plugin';
import { RegisterDto } from '@src/models/auth/auth-register.model';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/entities/user.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

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
    try {
      const user = await this.userService.findOneByUsername(username);
      if (!user) throw new HttpException('Username is not existed', HttpStatus.BAD_REQUEST);
      const isPasswordMatching = await Bcrypt.compare(password, user.password);
      if (!isPasswordMatching) {
        throw new HttpException('Password is wrong', HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      console.log('LOGIN_SERVICE_ERROR', error);
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  async login(user: any) {
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
    try {
      const result = await this.repo.save({ ...userRegister, roles: [{ id: 4 }] });
      console.log('RESULT', result);

    } catch (error) {
      console.log('SERVICE_AUTHEN_REGISTER', error);
      throw new InternalServerErrorException();
    }
  }
}
