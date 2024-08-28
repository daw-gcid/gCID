import { PartialType } from '@nestjs/mapped-types';
import { CreateTalentoDto } from './create-talento.dto';

export class UpdateTalentoDto extends PartialType(CreateTalentoDto) {}
