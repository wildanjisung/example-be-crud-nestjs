import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseInterceptors, ClassSerializerInterceptor, Put, HttpException, HttpStatus, UploadedFile, ParseFilePipeBuilder, Request, StreamableFile, Header } from '@nestjs/common';
import { UsersService } from './users.service';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid'; // For unique filenames
import { createReadStream, promises as fs } from 'fs';
import { join } from 'path';
import { Public } from 'src/auth/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';


@Controller('user')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private configService: ConfigService
  ) {}

  @Get()
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    return this.userService.findAll(query);
  }

  @Get('/:id')
  select(@Param('id') id: string): Promise<User> {
    return this.userService.select(id);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user: Promise<User> =  this.userService.createWithAttr(createUserDto);
    return plainToClass(User, user);
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const user: Promise<User> =  this.userService.update(id, updateUserDto);
    return plainToClass(User, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
