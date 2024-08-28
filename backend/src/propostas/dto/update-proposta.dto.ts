import { PartialType } from '@nestjs/mapped-types';
import { CreatePropostaDto } from './create-proposta.dto';

export class UpdatePropostaDto extends PartialType(CreatePropostaDto) {}
