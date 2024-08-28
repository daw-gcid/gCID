import { IsNumber, IsString } from 'class-validator';

export class CounterPropostaDto {
  @IsString()
  messageResposta: string;

  estimativaValor: number;
}
