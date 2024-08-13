import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Projeto } from './entities/projeto.entity';
import { Repository } from 'typeorm';
import { AreaService } from 'src/area/area.service';
import { ClienteService } from 'src/cliente/cliente.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { InstitutoService } from 'src/instituto/instituto.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjetoService {
  constructor(
    @InjectRepository(Projeto)
    private projetoRepository: Repository<Projeto>,
    private clienteService: ClienteService,
    private institutoService: InstitutoService,
    private areaService: AreaService,
  ) {}

  async create(createProjetoDto: CreateProjetoDto) {
    try {
      // Verifica se o cliente existe
      if (!createProjetoDto.clienteId) {
        throw new BadRequestException('O id de cliente não pode ser vazio');
      }
      const cliente = await this.clienteService.findOne(
        createProjetoDto.clienteId,
      );
      if (!cliente) {
        throw new NotFoundException(
          `Cliente de ID ${createProjetoDto.clienteId} não encontrado`,
        );
      }

      // Cria o projeto
      const proj = this.projetoRepository.create(createProjetoDto);
      proj.cliente = cliente;

      // Salva o projeto
      const savedProjeto = await this.projetoRepository.save(proj);
      console.log('Projeto salvo com sucesso:', savedProjeto);

      return savedProjeto.id;
    } catch (error) {
      console.error('Erro ao criar projeto:', error.message);
      throw new InternalServerErrorException(
        'Erro ao criar projeto: ' + error.message,
      );
    }
  }

  async findAllClienteProjects(clientId: string) {
    return this.projetoRepository.find({
      where: { cliente: { id: clientId } },
      relations: ['cliente'],
    });
  }

  async findAllInstituteProjects(instituteId: string) {
    return await this.projetoRepository.find({
      where: { instituto: { id: instituteId } },
      relations: ['instituto', 'cliente'],
    });
  }

  async findAllPublicProjects() {
    const projects = await this.projetoRepository.find({
      where: { publico: true },
    });

    return projects;
  }

  async findOne(id: string) {
    return this.projetoRepository.findOne({ where: { id } });
  }

  async findAll() {
    return await this.projetoRepository.find();
  }

  async update(id: string, updateProjetoDto: UpdateProjetoDto) {
    const proj = await this.projetoRepository.findOne({
      where: { id },
      relations: ['areas', 'cliente', 'instituto'],
    });
    if (!proj) {
      throw new NotFoundException('Projeto não encontrado');
    }

    if (updateProjetoDto.clienteId) {
      delete updateProjetoDto.clienteId;
    }

    if (updateProjetoDto.institutoId) {
      const instituto = await this.institutoService.findOne(
        updateProjetoDto.institutoId,
      );
      if (!instituto) {
        throw new NotFoundException(
          `Instituto de ID ${updateProjetoDto.institutoId} não encontrado`,
        );
      }
      proj.instituto = instituto;
    } else {
      proj.instituto = null;
    }

    if (updateProjetoDto.areasConhecimento) {
      const areas = [];
      for (const areaId of updateProjetoDto.areasConhecimento) {
        const area = await this.areaService.findOne(areaId);
        if (!area) {
          throw new NotFoundException(`Área de ID ${areaId} não encontrada`);
        }
        areas.push(area);
      }
      proj.areas = areas;
    }

    proj.dtFeedback = updateProjetoDto.feedback ? new Date() : null;

    Object.assign(proj, updateProjetoDto);

    await this.projetoRepository.save(proj);

    return proj;
  }

  async remove(id: string) {
    const proj = await this.projetoRepository.findOne({
      where: { id },
      relations: ['areas', 'cliente', 'instituto'],
    });

    if (!proj) {
      throw new NotFoundException('Projeto não encontrado');
    }

    return await this.projetoRepository.delete(id);
  }
}
