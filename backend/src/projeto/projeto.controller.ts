import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';

@Controller('projeto')
export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}

  @Post()
  create(@Body() createProjetoDto: CreateProjetoDto) {
    return this.projetoService.create(createProjetoDto);
  }

  @Get()
  findAll() {
    return this.projetoService.findAll();
  }

  @Get('cliente/:id')
  findAllClienteProjects(@Param('id') id: string) {
    return this.projetoService.findAllClienteProjects(id);
  }

  @Get('instituto/:id')
  findAllInstitutoProjects(@Param('id') id: string) {
    return this.projetoService.findAllInstituteProjects(id);
  }

  @Get('/publico')
  findAllPublicProjects() {
    return this.projetoService.findAllPublicProjects();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjetoDto: UpdateProjetoDto) {
    return this.projetoService.update(id, updateProjetoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projetoService.remove(id);
  }
}
