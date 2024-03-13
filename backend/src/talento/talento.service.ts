import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateTalentoDto,
  ExperienciaDto,
  IdiomaDto,
} from './dto/create-talento.dto';
import { UpdateTalentoDto } from './dto/update-talento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Talento } from './entities/talento.entity';
import { DeepPartial, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { Experiencia } from './entities/experiencia.entity';
import { Idioma } from './entities/idioma.entity';
import { Habilidade } from './entities/habilidade.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TalentoService {
  constructor(
    private userService: UserService,
    @InjectRepository(Talento)
    private talentoRepository: Repository<Talento>,
    @InjectRepository(Experiencia)
    private experienciaRepository: Repository<Experiencia>,
    @InjectRepository(Idioma)
    private idiomaRepository: Repository<Idioma>,
    @InjectRepository(Habilidade)
    private habilidadeRepository: Repository<Habilidade>,
  ) {}

  async create(createTalentoDto: CreateTalentoDto) {}

  findAll() {
    return this.talentoRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} talento`;
  }

  update(id: number, updateTalentoDto: UpdateTalentoDto) {
    return `This action updates a #${id} talento`;
  }

  remove(id: number) {
    return `This action removes a #${id} talento`;
  }
}
