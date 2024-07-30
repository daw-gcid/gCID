import { IsNumber, IsString } from 'class-validator';

export class CreatePropostaDto {
  @IsString()
  institutoId: string;

  @IsString()
  clientId: string;

  @IsString()
  projetoId: string;

  @IsNumber()
  remetentType: number;
}
