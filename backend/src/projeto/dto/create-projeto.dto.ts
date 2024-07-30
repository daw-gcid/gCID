import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ProjetoStatus } from '../entities/projeto.entity';

export class CreateProjetoDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsString()
  nome: string;

  @IsNotEmpty({ message: 'Descrição não pode ser vazia' })
  @IsString()
  descricao: string;

  @IsNotEmpty({ message: 'Informe um Id de Cliente válido' })
  @IsString()
  clienteId: string;

  @IsNotEmpty({ message: 'Informe a visibilidade do projeto' })
  @IsBoolean()
  publico: boolean;
}
