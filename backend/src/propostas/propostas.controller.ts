import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropostasService } from './propostas.service';
import { CreatePropostaDto } from './dto/create-proposta.dto';
import { UpdatePropostaDto } from './dto/update-proposta.dto';
import { CounterPropostaDto } from './dto/counter-proposta.dto';

@Controller('propostas')
export class PropostasController {
  constructor(private readonly propostasService: PropostasService) {}

  @Post()
  create(@Body() createPropostaDto: CreatePropostaDto) {
    return this.propostasService.create(createPropostaDto);
  }

  @Post('/counter/:id')
  counter(
    @Param('id') id: string,
    @Body() counterProposta: CounterPropostaDto,
  ) {
    return this.propostasService.counter(id, counterProposta);
  }

  @Post('/accept/:id')
  acceptProposal(@Param('id') id: string) {
    return this.propostasService.acceptProposal(id);
  }

  @Post('/refuse/:id')
  refuseProposal(@Param('id') id: string) {
    return this.propostasService.rejectProposal(id);
  }

  @Get('institute/:id')
  findAllInstitutesProposals(@Param('id') id: string) {
    return this.propostasService.findAllInstitutesProposal(id);
  }

  @Get('client/:id')
  findAllClientProposals(@Param('id') id: string) {
    return this.propostasService.findAllClientsProposal(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propostasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropostaDto: UpdatePropostaDto,
  ) {
    return this.propostasService.update(id, updatePropostaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propostasService.remove(id);
  }
}
