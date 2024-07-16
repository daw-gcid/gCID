import { IsString } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  id: string;

  @IsString()
  nome: string;

  @IsString()
  descricao: string;
}
