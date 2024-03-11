import { Injectable } from '@nestjs/common';
import { CreateTalentoDto } from './dto/create-talento.dto';
import { UpdateTalentoDto } from './dto/update-talento.dto';

@Injectable()
export class TalentoService {
  create(createTalentoDto: CreateTalentoDto) {
    return 'This action adds a new talento';
  }

  findAll() {
    return `This action returns all talento`;
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
