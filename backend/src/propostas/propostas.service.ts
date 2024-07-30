import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePropostaDto } from './dto/create-proposta.dto';
import { UpdatePropostaDto } from './dto/update-proposta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proposta } from './entities/proposta.entity';
import { Repository } from 'typeorm';
import { ProjetoService } from 'src/projeto/projeto.service';
import { ClienteService } from 'src/cliente/cliente.service';
import { InstitutoService } from 'src/instituto/instituto.service';
import { AreaService } from 'src/area/area.service';

@Injectable()
export class PropostasService {
  constructor(
    @InjectRepository(Proposta)
    private propostaRepository: Repository<Proposta>,
    private projetoService: ProjetoService,
    private clienteService: ClienteService,
    private institutoService: InstitutoService,
  ) {}
  async create(createPropostaDto: CreatePropostaDto) {
    if (!createPropostaDto.clientId) {
      throw new BadRequestException('Id de Cliente não pode ser vazio!');
    }

    if (!createPropostaDto.institutoId) {
      throw new BadRequestException('Id de Instituto não pode ser vazio!');
    }

    if (!createPropostaDto.projetoId) {
      throw new BadRequestException('A proposta deve conter algum projeto!');
    }

    if (!createPropostaDto.remetentType) {
      throw new BadRequestException('Informe quem está enviando a proposta!');
    }

    const client = await this.clienteService.findOne(
      createPropostaDto.clientId,
    );
    const institute = await this.institutoService.findOne(
      createPropostaDto.institutoId,
    );
    const project = await this.projetoService.findOne(
      createPropostaDto.projetoId,
    );

    if (!client || !institute || !project) {
      throw new NotFoundException('Dados não encontrados no sistema!');
    }
    let remetente: string = '';

    if (createPropostaDto.remetentType == 1) {
      remetente = client.id;
    } else if (createPropostaDto.remetentType == 2) {
      remetente = institute.id;
    }

    const proposta = await this.propostaRepository.create({
      instituto: institute,
      projeto: project,
      cliente: client,
      remetente: remetente,
    });

    return await this.propostaRepository.save(proposta);
  }

  async findAllInstitutesProposal(id: string) {
    const institute = await this.institutoService.findOne(id);

    if (!institute) {
      throw new NotFoundException('Instituto não encontrado');
    }

    return await this.propostaRepository.find({
      where: { instituto: { id: id } },
      relations: ['instituto'],
    });
  }

  async findAllClientsProposal(id: string) {
    const client = await this.clienteService.findOne(id);

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return await this.propostaRepository.find({
      where: { cliente: { id: id } },
      relations: ['cliente'],
    });
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
