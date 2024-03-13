import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TalentoService } from './talento.service';
import { CreateTalentoDto } from './dto/create-talento.dto';
import { UpdateTalentoDto } from './dto/update-talento.dto';

@Controller('talento')
export class TalentoController {
  constructor(private readonly talentoService: TalentoService) {}

  @Post()
  create(@Body() createTalentoDto: CreateTalentoDto) {
    return this.talentoService.create(createTalentoDto);
  }

  @Get()
  findAll() {
    return this.talentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.talentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTalentoDto: UpdateTalentoDto) {
    return this.talentoService.update(+id, updateTalentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.talentoService.remove(+id);
  }
}
