import { Injectable } from '@nestjs/common';
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
    return await this.areaRepository.save(area);
  }

  async findAll() {
    return await this.areaRepository.find();
  }

  async findOneById(id: string) {
    return await this.areaRepository.findOne({ where: { id: id } });
  }

  async findOneByName(name: string) {
    return await this.areaRepository.findOne({ where: { nome: name } });
  }

  update(id: string, updateAreaDto: UpdateAreaDto) {
    return `This action updates a #${id} area`;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
