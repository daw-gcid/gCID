import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    console.log('Iniciando criação do cliente com DTO:', createClienteDto);

    const user = await this.userService.findOne(createClienteDto.userId);
    if (!user) {
      console.error('Usuário não encontrado');
      throw new NotFoundException('Usuário não encontrado');
    }

    const cliente = this.clienteRepository.create(createClienteDto);
    cliente.user = user;

    user.status = 1;

    try {
      const userSaved = await this.userService.update(user.id, user);
      if (!userSaved) {
        console.error('Falha ao atualizar o usuário');
        throw new BadRequestException('Falha ao atualizar o usuário');
      }

      const savedCliente = await this.clienteRepository.save(cliente);
      console.log('Cliente salvo com sucesso:', savedCliente);
      return savedCliente;
    } catch (error) {
      console.error('Erro ao salvar cliente:', error.message);
      throw new BadRequestException('Erro ao salvar cliente: ' + error.message);
    }
  }

  async findAll() {
    return await this.clienteRepository.find();
  }

  async findOne(id: string) {
    return await this.clienteRepository.findOne({ where: { id: id } });
  }

  update(id: string, updateClienteDto: UpdateClienteDto) {
    return this.clienteRepository.update(id, updateClienteDto);
  }

  remove(id: string) {
    return `This action removes a #${id} cliente`;
  }
}
