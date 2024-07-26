import { Projeto } from './entities/projeto.entity';
import { Repository } from 'typeorm';
import { AreaService } from 'src/area/area.service';
import { ClienteService } from 'src/cliente/cliente.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { InstitutoService } from 'src/instituto/instituto.service';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

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
    if (createProjetoDto.clienteId === null) {
      return new BadRequestException('O id de cliente não pode ser vazio');
    }

    const proj = this.projetoRepository.create(createProjetoDto);

    const areas = [];

    const cliente = await this.clienteService.findOne(
      createProjetoDto.clienteId,
    );

    proj.areas = areas;
    proj.cliente = cliente;
    // proj.instituto = instituto;

    await this.projetoRepository.save(proj);

    return proj.id;
  }

  async findAllClienteProjects(clientId: string) {
    return await this.projetoRepository.find({
      where: { cliente: { id: clientId } },
      relations: ['cliente'],
    });
  }

  async findAllInstituteProjects(instituteId: string) {
    return await this.projetoRepository.find({
      where: { instituto: { id: instituteId } },
      relations: ['instituto'],
    });
  }

  async findAllPublicProjects() {
    const projects = await this.projetoRepository.find({
      where: { publico: true },
    });

    return projects;
  }

  async findOne(id: string) {
    return await this.projetoRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateProjetoDto: UpdateProjetoDto) {
    const proj = await this.projetoRepository.findOne({
      where: { id: id },
      relations: ['areas', 'cliente', 'instituto'],
    });
    if (!proj) {
      throw new BadRequestException('Projeto não encontrado');
    }

    // Verifica se o clienteId foi enviado no DTO e remove-o
    if (updateProjetoDto.clienteId) {
      delete updateProjetoDto.clienteId;
    }

    if (updateProjetoDto.institutoId) {
      const instituto = await this.institutoService.findOne(
        updateProjetoDto.institutoId,
      );
      proj.instituto = instituto;
    } else {
      proj.instituto = null;
    }

    if (updateProjetoDto.areasConhecimento) {
      const areas = [];
      for (const areaName of updateProjetoDto.areasConhecimento) {
        const achouArea = await this.areaService.findOneByName(areaName);
        if (achouArea) {
          areas.push(achouArea);
        }
      }
      proj.areas = areas;
    }

    if (updateProjetoDto.feedback) {
      proj.dtFeedback = new Date();
    } else {
      proj.dtFeedback = null;
    }

    Object.assign(proj, updateProjetoDto);

    await this.projetoRepository.save(proj);

    return proj;
  }

  async remove(id: string) {
    const proj = await this.projetoRepository.findOne({
      where: { id: id },
      relations: ['areas', 'cliente', 'instituto'],
    });

    if (!proj) {
      throw new BadRequestException('Projeto não encontrado');
    }

    return await this.projetoRepository.delete(id);
  }
}
