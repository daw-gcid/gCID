import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from './entities/area.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
  ) {}

  async create(createAreaDto: CreateAreaDto) {
    const area = this.areaRepository.create(createAreaDto);
    await this.areaRepository.save(area);
    return area.id;
  }

  async findAll() {
    return await this.areaRepository.find();
  }

  async findOneById(id: string) {
    const area = await this.areaRepository.findOne({ where: { id: id } });
    if (!area) {
      throw new NotFoundException(`Area de id ${id} não encontrada`);
    }
    return area;
  }

  async findOneByName(name: string) {
    const area = await this.areaRepository.findOne({ where: { nome: name } });
    if (!area) {
      throw new NotFoundException(`Area de nome ${name} não encontrada`);
    }
    return area;
  }

  async update(id: string, updateAreaDto: UpdateAreaDto) {
    const area = await this.findOneById(id);

    if (!area) {
      throw new NotFoundException(`Area de id ${id} não encontrada`);
    }

    if (updateAreaDto.nome != null) {
      area.nome = updateAreaDto.nome;
    }

    if (updateAreaDto.descricao != null) {
      area.descricao = updateAreaDto.descricao;
    }

    await this.areaRepository.save(area);
    return area.id;
  }

  async remove(id: string) {
    const area = await this.findOneById(id);
    if (!area) {
      throw new NotFoundException(`Area de id ${id} não encontrada`);
    }

    return await this.areaRepository.delete(area);
  }
}
