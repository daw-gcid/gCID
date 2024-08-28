import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { UserService } from 'src/user/user.service';
import { pipeline, Readable } from 'stream';
import { Repository } from 'typeorm';
import { promisify } from 'util';
import { CreateTalentoDto } from './dto/create-talento.dto';
import { FileDto } from './dto/file-talento.dto';
import { UpdateTalentoDto } from './dto/update-talento.dto';
import { Talento } from './entities/talento.entity';

@Injectable()
export class TalentoService {
  constructor(
    @InjectRepository(Talento)
    private talentoRepository: Repository<Talento>,
    private userService: UserService,
  ) {}

  async create(
    createTalentoDto: CreateTalentoDto,
    matricula: FileDto,
    historico: FileDto,
  ) {
    if (matricula) {
      const pump = promisify(pipeline);
      const extension = path.extname(matricula.originalname);
      const fileBaseName = path.basename(matricula.originalname, extension);
      const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`;
      const uploadDestination = path.resolve(
        __dirname,
        '../../uploads/talento/matricula',
        fileUploadName,
      );

      const directory = path.dirname(uploadDestination);
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }

      const fileReadStream = Readable.from([matricula.buffer]);

      const fileWriteStream = fs.createWriteStream(uploadDestination);

      createTalentoDto.pathMatricula = uploadDestination;
      await pump(fileReadStream, fileWriteStream);
    }

    if (historico) {
      const pump = promisify(pipeline);
      const extension = path.extname(historico.originalname);
      const fileBaseName = path.basename(historico.originalname, extension);
      const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`;
      const uploadDestination = path.resolve(
        __dirname,
        '../../uploads/talento/historico',
        fileUploadName,
      );

      const directory = path.dirname(uploadDestination);
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }

      const fileReadStream = Readable.from([historico.buffer]);

      const fileWriteStream = fs.createWriteStream(uploadDestination);

      createTalentoDto.pathHistorico = uploadDestination;
      await pump(fileReadStream, fileWriteStream);
    }
    const user = await this.userService.findOne(createTalentoDto.userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    user.status = 1;
    delete user.password;
    const userSaved = await this.userService.update(user.id, user);
    if (!userSaved) {
      throw new BadRequestException('User not updated');
    }

    const talento = await this.talentoRepository.create(createTalentoDto);
    talento.user = user;

    try {
      return await this.talentoRepository.save(talento);
    } catch (error) {
      // console.log(error);
      throw new BadRequestException('Talento not created', error);
    }
    //return talento + user associado
  }

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
