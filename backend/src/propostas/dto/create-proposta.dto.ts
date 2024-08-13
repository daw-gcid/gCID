import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreatePropostaDto {
  @IsString()
  institutoId: string;

  @IsString()
  clientId: string;

  @IsString()
  projetoId: string;

  @IsString()
  message: string;

  @IsNumber()
  estimativaValor: number;

  @IsNumber()
  remetentType: number;

  @IsDate()
  @Type(() => Date)
  previsaoInicio: Date;

  @IsDate()
  @Type(() => Date)
  previsaoFim: Date;
}
