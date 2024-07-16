import { Injectable } from '@nestjs/common';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Projeto } from './entities/projeto.entity';
import { Repository } from 'typeorm';
import { ClienteService } from 'src/cliente/cliente.service';
import { InstitutoService } from 'src/instituto/instituto.service';

@Injectable()
export class ProjetoService {
  constructor(
    @InjectRepository(Projeto)
    private projetoRepository: Repository<Projeto>,
    private clienteService: ClienteService,
    private institutoService: InstitutoService,
  ) {}
  
  create(createProjetoDto: CreateProjetoDto) {
    return this.projetoRepository.create(createProjetoDto);
  }

  findAllClienteProjects(clientId: string) {
    return this.projetoRepository.find({
      where: { cliente: { id: clientId } },
      relations: ['cliente'],
    });
  }

  findAllInstituteProjects(instituteId: string) {
    return this.projetoRepository.find({
      where: { instituto: { id: instituteId } },
      relations: ['instituto'],
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} projeto`;
  }

  update(id: string, updateProjetoDto: UpdateProjetoDto) {
    return `This action updates a #${id} projeto`;
  }

  remove(id: string) {
    return `This action removes a #${id} projeto`;
  }
}
