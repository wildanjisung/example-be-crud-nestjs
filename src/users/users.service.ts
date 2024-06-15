import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import bcrypt from 'bcrypt';
import { PaginateQuery, Paginated, paginate, FilterOperator, FilterSuffix } from 'nestjs-paginate';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id: id});
  }

  async findOneByUsername(userDto: UserDto): Promise<User | undefined> {
    const { username } = userDto;

    return this.userRepository.findOneBy({ username: username });
  }

  async create(userDto: UserDto): Promise<User> {
    return this.userRepository.save(userDto);
  }

  // ---
  async findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      sortableColumns: ['id', 'username', ],
      nullSort: 'last',
      defaultSortBy: [['username', 'ASC']],
      searchableColumns: ['id', 'username'],
      select: ['id', 'username'],
      filterableColumns: {
        username: [FilterOperator.EQ, FilterSuffix.NOT],
      },
    })
  }

  async select(id: string): Promise<User> {
  const found = await this.userRepository.findOne({ where: { id } });
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

    return this.userRepository.save(createUserDto);
  }

  async update(id, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const userToUpdate = await this.userRepository.findOneBy({
        id: id,
      })

      const updatedDto = {...userToUpdate, ...updateUserDto}
      return await this.userRepository.save(updatedDto);
      
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async remove(id): Promise<User> {
    try {
      const userToDelete = await this.userRepository.findOneBy({
        id: id,
      })
      return await this.userRepository.remove(userToDelete);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}