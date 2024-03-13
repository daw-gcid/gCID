import { Injectable } from '@nestjs/common';
import { CreateInstitutoDto } from './dto/create-instituto.dto';
import { UpdateInstitutoDto } from './dto/update-instituto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Instituto } from './entities/instituto.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InstitutoService {
  constructor(
    @InjectRepository(Instituto)
    private institutoRepository: Repository<Instituto>,
    private userService: UserService,
  ) {}

  async create(createInstitutoDto: CreateInstitutoDto) {
    const instituto = await this.institutoRepository.save(createInstitutoDto);
    this.userService.update(createInstitutoDto.userId, {
      instituto: instituto,
    });
    return instituto;
  }

  findAll() {
    return this.institutoRepository.find();
  }

  findOne(id: string) {
    return this.institutoRepository.findOne({ where: { id: id } });
  }

  update(id: string, updateInstitutoDto: UpdateInstitutoDto) {
    return this.institutoRepository.update(id, updateInstitutoDto);
  }

  remove(id: string) {
    return this.institutoRepository.delete(id);
  }
}
