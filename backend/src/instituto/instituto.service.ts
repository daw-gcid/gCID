import { Injectable } from '@nestjs/common';
import { CreateInstitutoDto } from './dto/create-instituto.dto';
import { UpdateInstitutoDto } from './dto/update-instituto.dto';

@Injectable()
export class InstitutoService {
  create(createInstitutoDto: CreateInstitutoDto) {
    return 'This action adds a new instituto';
  }

  findAll() {
    return `This action returns all instituto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} instituto`;
  }

  update(id: number, updateInstitutoDto: UpdateInstitutoDto) {
    return `This action updates a #${id} instituto`;
  }

  remove(id: number) {
    return `This action removes a #${id} instituto`;
  }
}
