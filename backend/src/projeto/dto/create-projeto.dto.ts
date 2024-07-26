import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';
import { ProjetoStatus } from '../entities/projeto.entity';

export class CreateProjetoDto {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsString()
  clienteId: string;

  @IsBoolean()
  publico: boolean;
}
