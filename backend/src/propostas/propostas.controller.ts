import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropostasService } from './propostas.service';
import { CreatePropostaDto } from './dto/create-proposta.dto';
import { UpdatePropostaDto } from './dto/update-proposta.dto';

@Controller('propostas')
export class PropostasController {
  constructor(private readonly propostasService: PropostasService) {}

  @Post()
  create(@Body() createPropostaDto: CreatePropostaDto) {
    return this.propostasService.create(createPropostaDto);
  }

  @Get()
  findAll() {
    return this.propostasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propostasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropostaDto: UpdatePropostaDto) {
    return this.propostasService.update(+id, updatePropostaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propostasService.remove(+id);
  }
}
