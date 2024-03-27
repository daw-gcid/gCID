import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente) private clienteRepository: Repository<Cliente>,
    private userService: UserService,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    const cliente = await this.clienteRepository.create(createClienteDto);
    cliente.user = await this.userService.findOne(createClienteDto.userId);
    if (!cliente.user) {
      throw new Error('User not found');
    }
    const user = cliente.user;
    delete user.password;
    user.status = 1;
    const userSaved = await this.userService.update(user.id, user);
    if (!userSaved) {
      throw new Error('User not updated');
    }
    return await this.clienteRepository.save(cliente);
  }

  findAll() {
    return this.clienteRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} cliente`;
  }

  update(id: string, updateClienteDto: UpdateClienteDto) {
    return this.clienteRepository.update(id, updateClienteDto);
  }

  remove(id: string) {
    return `This action removes a #${id} cliente`;
  }
}
