import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import bcrypt from 'bcrypt';
import { PaginateQuery, Paginated, paginate, FilterOperator, FilterSuffix } from 'nestjs-paginate';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { plainToClass } from 'class-transformer';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async findOne(id: string): Promise<User | undefined> {
    return this.userRepository.getOne(id);
  }

  async findOneByUsername(userDto: UserDto): Promise<User | undefined> {
    const { username } = userDto;

    return this.userRepository.getOneByUsername(username);
  }

  async create(userDto: UserDto): Promise<User> {
    const user = plainToClass(User, userDto)
    return this.userRepository.create(user);
  }

  // ---
  async findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return this.userRepository.getAll(query);
  }

  async select(id: string): Promise<User> {
  const found = await this.userRepository.getOne(id);
    if (!found) {
      throw new NotFoundException(
        `Participant not found with Id ${id} not found`,
      );
    }
    return found;
  }

  async createWithAttr(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt)
    createUserDto.password = hashedPassword

    const user = plainToClass(User, createUserDto)
    return this.userRepository.create(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const userToUpdate = await this.userRepository.getOne(id)

      const updatedDto = {...userToUpdate, ...updateUserDto}
      return await this.userRepository.create(updatedDto);
      
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async remove(id: string): Promise<User> {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}