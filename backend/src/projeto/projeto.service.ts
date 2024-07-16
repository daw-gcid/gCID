import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Projeto } from './entities/projeto.entity';
import { Repository } from 'typeorm';
import { ClienteService } from 'src/cliente/cliente.service';
import { InstitutoService } from 'src/instituto/instituto.service';
import { AreaService } from 'src/area/area.service';

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

    const areas = [];
    const proj = this.projetoRepository.create(createProjetoDto);
    const cliente = await this.clienteService.findOne(
      createProjetoDto.clienteId,
    );
    const instituto = await this.institutoService.findOne(
      createProjetoDto.institutoId,
    );

    for (const areaName of createProjetoDto.areasConhecimento) {
      const achouArea = await this.areaService.findOneByName(areaName);

      if (achouArea != null) {
        areas.push(achouArea);
      }
    }

    if (createProjetoDto.institutoId != null) {
      proj.instituto = await this.institutoService.findOne(
        createProjetoDto.institutoId,
      );
    } else proj.instituto = null;

    if (createProjetoDto.feedback != null) {
      proj.dtFeedback = new Date();
    } else {
      proj.dtFeedback = null;
    }

    proj.nome = createProjetoDto.name;
    proj.descricao = createProjetoDto.description;
    proj.dtFim = null;
    proj.areas = areas;
    proj.cliente = cliente;
    proj.instituto = instituto;

    return await this.projetoRepository.save(proj);
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

  async findOne(id: string) {
    return await this.projetoRepository.findOne({ where: { id: id } });
  }

  update(id: string, updateProjetoDto: UpdateProjetoDto) {
    return `This action updates a #${id} projeto`;
  }

  remove(id: string) {
    return `This action removes a #${id} projeto`;
  }
}
