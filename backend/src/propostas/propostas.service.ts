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

@Injectable()
export class PropostasService {
  constructor(
    @InjectRepository(Proposta)
    private propostaRepository: Repository<Proposta>,
    private projetoService: ProjetoService,
    private clienteService: ClienteService,
    private institutoService: InstitutoService,
  ) {}

  async create(
    createPropostaDto: CreatePropostaDto,
    originalPropostaId?: string,
  ) {
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

    // Se houver uma proposta original, copiar suas informações
    let originalProposta: Proposta | null = null;
    if (originalPropostaId) {
      originalProposta = await this.propostaRepository.findOne({
        where: { id: originalPropostaId },
        relations: ['cliente', 'instituto', 'projeto'],
      });

      if (!originalProposta) {
        throw new NotFoundException('Proposta original não encontrada');
      }
    }

    const proposta = this.propostaRepository.create({
      instituto: institute,
      projeto: project,
      cliente: client,
      remetente: remetente,
      status: originalProposta ? 1 : 0,
      message: createPropostaDto.message || originalProposta?.message,
      estimativaValor:
        createPropostaDto.estimativaValor || originalProposta?.estimativaValor,
      previsaoInicio:
        createPropostaDto.previsaoInicio || originalProposta?.previsaoInicio,
      previsaoFim:
        createPropostaDto.previsaoFim || originalProposta?.previsaoFim,
    });

    return await this.propostaRepository.save(proposta);
  }

  async findOneInstitutoProposal(instituteId: string, projetoId: string) {
    const propostas = await this.propostaRepository.find({
      where: {
        instituto: { id: instituteId },
        projeto: { id: projetoId },
      },
      relations: ['cliente', 'projeto', 'instituto'],
      order: { dataCriacao: 'DESC' },
    });

    if (propostas.length === 0) {
      throw new NotFoundException('Proposta não encontrada');
    }

    return propostas[0]; // A primeira proposta é a mais recente
  }

  async findAllInstitutesProposal(id: string) {
    const institute = await this.institutoService.findOne(id);

    if (!institute) {
      throw new NotFoundException('Instituto não encontrado');
    }

    const propostas = await this.propostaRepository.find({
      where: { instituto: { id: id } },
      order: { dataCriacao: 'DESC' },
      relations: ['projeto', 'instituto', 'cliente'],
    });

    const propostasUnicas = new Map<string, Proposta>();

    for (const proposta of propostas) {
      if (!propostasUnicas.has(proposta.projeto.id)) {
        propostasUnicas.set(proposta.projeto.id, proposta);
      }
    }

    return Array.from(propostasUnicas.values());
  }

  async findOneClientProposal(clientId: string, projetoId: string) {
    const propostas = await this.propostaRepository.find({
      where: {
        cliente: { id: clientId },
        projeto: { id: projetoId },
      },
      relations: ['cliente', 'projeto', 'instituto'],
      order: { dataCriacao: 'DESC' },
    });

    if (propostas.length === 0) {
      throw new NotFoundException('Proposta não encontrada');
    }

    return propostas[0]; // A primeira proposta é a mais recente
  }

  async findAllClientsProposal(id: string) {
    const client = await this.clienteService.findOne(id);

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const propostas = await this.propostaRepository.find({
      where: { cliente: { id: id }, aceito: false },
      relations: ['cliente', 'projeto', 'instituto'],
      order: { dataCriacao: 'DESC' },
    });

    const propostasUnicas = new Map<string, Proposta>();

    for (const proposta of propostas) {
      if (!propostasUnicas.has(proposta.projeto.id)) {
        propostasUnicas.set(proposta.projeto.id, proposta);
      }
    }

    return Array.from(propostasUnicas.values());
  }

  findOne(id: string) {
    return this.propostaRepository.findOne({
      where: { id: id },
      relations: ['cliente', 'projeto', 'instituto'],
    });
  }

  async update(id: string, updatePropostaDto: UpdatePropostaDto) {
    const proposta = await this.propostaRepository.findOne({ where: { id } });

    // console.log(updatePropostaDto);

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

    if (updatePropostaDto.estimativaValor) {
      proposta.estimativaValor = updatePropostaDto.estimativaValor;
    }

    if (updatePropostaDto.previsaoInicio) {
      proposta.previsaoInicio = updatePropostaDto.previsaoInicio;
    }

    if (updatePropostaDto.previsaoFim) {
      proposta.previsaoFim = updatePropostaDto.previsaoFim;
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

  async acceptProposal(id: string) {
    const proposta = await this.propostaRepository.findOne({
      where: { id },
      relations: ['projeto', 'cliente', 'instituto'],
    });

    if (!proposta) {
      throw new NotFoundException(`Proposta com id ${id} não encontrada`);
    }

    if (!proposta.instituto.id) {
      throw new NotFoundException(
        'A Proposta não está associada a nenhum instituto',
      );
    }

    const projeto = await this.projetoService.findOne(proposta.projeto.id);

    const relatedProposals = await this.propostaRepository.find({
      where: { projeto: { id: projeto.id }, aceito: false },
    });

    for (const relatedProposta of relatedProposals) {
      relatedProposta.dataExclusao = new Date(); // Marcar como deletado (soft delete)
      await this.propostaRepository.save(relatedProposta);
    }

    proposta.aceito = true;

    projeto.instituto = proposta.instituto;
    projeto.estimativaValor = proposta.estimativaValor;
    projeto.dtInicio = proposta.previsaoInicio;
    projeto.dtFim = proposta.previsaoFim;

    await this.projetoService.update(proposta.projeto.id, {
      estimativaValor: proposta.estimativaValor,
      dtInicio: proposta.previsaoInicio,
      dtFim: proposta.previsaoFim,
    });

    await this.propostaRepository.save(proposta);

    return `A proposta entre o instituto ${proposta.instituto.nome} e o cliente ${proposta.cliente.nome} foi aceita!`;
  }
}
