import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';
import { projetoStatus } from '../entities/projeto.entity';

export class CreateProjetoDto {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsString()
  feedback: string;

  @IsString()
  clienteId: string;

  @IsString()
  institutoId: string;

  @IsBoolean()
  publico: boolean;

  @IsArray()
  areasConhecimento: string[];
}
