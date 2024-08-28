import { PartialType } from '@nestjs/swagger';
import { CreateEquipeDto } from './create-equipe.dto';

export class UpdateEquipeDto extends PartialType(CreateEquipeDto) {}
