import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from 'src/users/entities/user.entity';
import { plainToClass } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('signin')
  signIn(@Body() signInDto: AuthCredentialsDto): Promise<{ accessToken: string}>  {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('signup')
  signUp(@Body() signUpDto: AuthCredentialsDto): Promise<{ accessToken: string}>  {
    return this.authService.signUp(signUpDto);
  }

  // @UseGuards(AuthGuard) // registered golbally at module
  @Get('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  async getProfile(@Request() req): Promise<User> {
    const user = await this.authService.loggedInUser(req.user.sub);
    return plainToClass(User, user);
  }
}
