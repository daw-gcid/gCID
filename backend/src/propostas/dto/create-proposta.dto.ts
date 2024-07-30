import { IsString } from 'class-validator';

export class CreatePropostaDto {
  @IsString()
  remetenteId: string;

  @IsString()
  institutoId: string;

  @IsString()
  projetoId: string;
}
