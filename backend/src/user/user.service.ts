import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.save(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message, error.code);
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }
    return user;
  }

  async findOneId(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async findUsernameOrEmail(username?: string, email?: string) {
    if (!username && !email) {
      throw new BadRequestException(`Username or email is required`);
    }

    let user: User | undefined;
    if (username) {
      user = await this.userRepository.findOne({ where: { username } });
    } else if (email) {
      user = await this.userRepository.findOne({ where: { email } });
    }
    if (!user) {
      throw new BadRequestException(`User not found`);
    }
    return user;
  }

  async remove(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new BadRequestException(`User with id ${id} not found`);
      }
      await this.userRepository.remove(user);
      return { message: `User with id ${id} removed` };
    } catch (error) {
      throw new BadRequestException(error.message, error.code);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw new BadRequestException(error.message, error.code);
    }
  }
}