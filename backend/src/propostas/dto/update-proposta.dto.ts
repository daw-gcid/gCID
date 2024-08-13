import { PartialType } from '@nestjs/swagger';
import { CreatePropostaDto } from './create-proposta.dto';

export class UpdatePropostaDto extends PartialType(CreatePropostaDto) {}
    