import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InstitutoService } from './instituto.service';
import { CreateInstitutoDto } from './dto/create-instituto.dto';
import { UpdateInstitutoDto } from './dto/update-instituto.dto';

@Controller('instituto')
export class InstitutoController {
  constructor(private readonly institutoService: InstitutoService) {}

  @Post()
  create(@Body() createInstitutoDto: CreateInstitutoDto) {
    return this.institutoService.create(createInstitutoDto);
  }

  @Get()
  findAll() {
    return this.institutoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.institutoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstitutoDto: UpdateInstitutoDto,
  ) {
    return this.institutoService.update(id, updateInstitutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.institutoService.remove(id);
  }
}
