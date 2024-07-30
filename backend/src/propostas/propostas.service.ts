import { Injectable } from '@nestjs/common';
import { CreatePropostaDto } from './dto/create-proposta.dto';
import { UpdatePropostaDto } from './dto/update-proposta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proposta } from './entities/proposta.entity';
import { Repository } from 'typeorm';
import { ProjetoService } from 'src/projeto/projeto.service';
import { ClienteService } from 'src/cliente/cliente.service';
import { InstitutoService } from 'src/instituto/instituto.service';

@Injectable()
export class PropostasService {
  constructor(
    @InjectRepository(Proposta)
    private propostaRepository: Repository<Proposta>,
    private projetoService: ProjetoService,
    private clienteService: ClienteService,
    private institutoService: InstitutoService,
  ) {}
  create(createPropostaDto: CreatePropostaDto) {
    return 'This action adds a new proposta';
  }

  findAll() {
    return `This action returns all propostas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proposta`;
  }

  update(id: number, updatePropostaDto: UpdatePropostaDto) {
    return `This action updates a #${id} proposta`;
  }

  remove(id: number) {
    return `This action removes a #${id} proposta`;
  }
}
