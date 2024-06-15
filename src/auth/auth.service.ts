import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import bcrypt from 'bcrypt';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(signInDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = signInDto;

    const user = await this.usersService.findOneByUsername(signInDto);

    if (user && (await bcrypt.compare(password, user?.password))) {
      const payload = { sub: user.id, username: user.username, role: user.role };
      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async signUp(signUpDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    // return this.usersService.create(signUpDto);

    const { username, password } = signUpDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt)

    const UserDto: UserDto = {
      username: username,
      password: hashedPassword
    }

    try {
      await this.usersService.create(UserDto);
      return await this.signIn(signUpDto);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async loggedInUser(id: string): Promise<User> {
    return this.usersService.findOne(id)
  }
}