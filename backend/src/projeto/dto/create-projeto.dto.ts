import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { projetoStatus } from '../entities/projeto.entity';

export class CreateProjetoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  descricao: string;

  @IsNumber()
  status: projetoStatus;

  @IsString()
  feedback: string;

  @IsString()
  clienteId: string;

  @IsString()
  institutoId: string;

  @IsBoolean()
  publico: boolean;

  @IsArray()
  @IsString({ each: true })
  areasConhecimento: string[];
}
