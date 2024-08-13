import { PartialType } from '@nestjs/mapped-types';
import { CreateProjetoDto } from './create-projeto.dto';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { ProjetoStatus } from '../entities/projeto.entity';

export class UpdateProjetoDto extends PartialType(CreateProjetoDto) {
  @IsString()
  feedback: string;

  @IsString()
  institutoId: string;

  @IsArray()
  areasConhecimento: string[];

  @IsEnum(ProjetoStatus)
  status: ProjetoStatus;

  @IsNumber()
  estimativaValor: number;
}
