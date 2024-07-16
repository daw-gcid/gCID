import { IsArray, IsNumber, IsString } from 'class-validator';
import { projetoStatus } from '../entities/projeto.entity';

export class CreateProjetoDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  status: projetoStatus;

  @IsString()
  feedback: string;

  @IsString()
  clienteId: string;

  @IsString()
  institutoId: string;

  @IsArray()
  areasConhecimento: string[];
}
