import { PartialType } from '@nestjs/mapped-types';
import { CreateInstitutoDto } from './create-instituto.dto';

export class UpdateInstitutoDto extends PartialType(CreateInstitutoDto) {}
