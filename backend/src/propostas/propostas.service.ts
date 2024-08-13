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
      relations: ['cliente', 'projeto'],
    });
  }

  findOne(id: string) {
    return this.propostaRepository.findOne({
      where: { id: id },
      relations: ['cliente', 'projeto'],
    });
  }

  async update(id: string, updatePropostaDto: UpdatePropostaDto) {
    const proposta = await this.propostaRepository.findOne({ where: { id } });

    if (!proposta) {
      throw new NotFoundException(`Proposta com id ${id} não encontrada`);
    }

    if (updatePropostaDto.clientId) {
      const client = await this.clienteService.findOne(
        updatePropostaDto.clientId,
      );
      if (!client) {
        throw new NotFoundException('Cliente não encontrado');
      }
      proposta.cliente = client;
    }

    if (updatePropostaDto.institutoId) {
      const institute = await this.institutoService.findOne(
        updatePropostaDto.institutoId,
      );
      if (!institute) {
        throw new NotFoundException('Instituto não encontrado');
      }
      proposta.instituto = institute;
    }

    if (updatePropostaDto.projetoId) {
      const project = await this.projetoService.findOne(
        updatePropostaDto.projetoId,
      );
      if (!project) {
        throw new NotFoundException('Projeto não encontrado');
      }
      proposta.projeto = project;
    }

    if (updatePropostaDto.remetentType) {
      let remetente: string;
      if (updatePropostaDto.remetentType == 1) {
        remetente = proposta.cliente.id;
      } else if (updatePropostaDto.remetentType == 2) {
        remetente = proposta.instituto.id;
      } else {
        throw new BadRequestException('Tipo de remetente inválido');
      }
      proposta.remetente = remetente;
    }

    await this.propostaRepository.save(proposta);
    return proposta;
  }

  // Método de delete
  async remove(id: string) {
    const proposta = await this.propostaRepository.findOne({ where: { id } });

    if (!proposta) {
      throw new NotFoundException(`Proposta com id ${id} não encontrada`);
    }

    await this.propostaRepository.remove(proposta);
    return { message: `Proposta com id ${id} foi removida com sucesso` };
  }
}
