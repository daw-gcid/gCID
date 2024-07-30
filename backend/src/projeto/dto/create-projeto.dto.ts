import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjetoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsString()
  clienteId: string;

  @IsBoolean()
  publico: boolean;
}
