import { IsString } from 'class-validator';

export class CreateAreaDto {

  @IsString()
  nome: string;

  @IsString()
  descricao: string;
}
