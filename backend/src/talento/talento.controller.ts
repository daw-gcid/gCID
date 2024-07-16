import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { FileDto } from './dto/file-talento.dto';
import { UpdateTalentoDto } from './dto/update-talento.dto';
import { TalentoService } from './talento.service';
import { CreateTalentoDto } from './dto/create-talento.dto';

@Controller('talento')
export class TalentoController {
  constructor(private readonly talentoService: TalentoService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'pathHistorico', maxCount: 1 },
      { name: 'pathMatricula', maxCount: 1 },
    ]),
  )
  async create(
    @Body() createTalentoDto: CreateTalentoDto,
    @UploadedFiles()
    files: {
      pathHistorico?: FileDto;
      pathMatricula?: FileDto;
    },
  ) {
    return this.talentoService.create(
      createTalentoDto,
      files['pathMatricula'][0],
      files['pathHistorico'][0],
    );
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
