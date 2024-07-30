import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateInstitutoDto } from './dto/create-instituto.dto';
import { UpdateInstitutoDto } from './dto/update-instituto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Instituto } from './entities/instituto.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InstitutoService {
  constructor(
    @InjectRepository(Instituto)
    private institutoRepository: Repository<Instituto>,
    private userService: UserService,
  ) {}

  async create(createInstitutoDto: CreateInstitutoDto) {
    try {
      const user = await this.userService.findOne(createInstitutoDto.userId);
      if (!user) {
        throw new BadRequestException('Usuário não encontrado');
      }

      delete user.password;  // Remove informações sensíveis
      user.status = 1;
      const userSaved = await this.userService.update(user.id, user);
      if (!userSaved) {
        throw new InternalServerErrorException('Usuário não atualizado');
      }

      const instituto = this.institutoRepository.create(createInstitutoDto);
      instituto.user = user;
      
      return await this.institutoRepository.save(instituto);
    } catch (error) {
      throw new InternalServerErrorException(`Falha ao criar Instituto: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.institutoRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Falha ao recuperar Institutos');
    }
  }

  async findOne(id: string) {
    try {
      const instituto = await this.institutoRepository.findOne({ where: { id } });
      if (!instituto) {
        throw new BadRequestException('Instituto não encontrado');
      }
      return instituto;
    } catch (error) {
      throw new InternalServerErrorException(`Falha ao recuperar Instituto com id ${id}`);
    }
  }

  async update(id: string, updateInstitutoDto: UpdateInstitutoDto) {
    try {
      const result = await this.institutoRepository.update(id, updateInstitutoDto);
      if (result.affected === 0) {
        throw new BadRequestException('Instituto não encontrado ou nenhuma alteração foi feita');
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException(`Falha ao atualizar Instituto com id ${id}`);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.institutoRepository.delete(id);
      if (result.affected === 0) {
        throw new BadRequestException('Instituto não encontrado');
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException(`Falha ao excluir Instituto com id ${id}`);
    }
  }
}
