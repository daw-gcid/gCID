import { IsString, IsEmail } from 'class-validator';

// function IsRankingValid() {
//   return Validate(
//     (value: number) => {
//       return value >= 0 && value <= 5;
//     },
//     {
//       message: 'O ranking deve ser um número entre 0 e 5.',
//     },
//   );
// }

export class CreateInstitutoDto {
  @IsString()
  cnpj: string;

  @IsString()
  nome: string;

  @IsString()
  endereco: string;

  @IsString()
  cidade: string;

  @IsString()
  estado: string;

  @IsString()
  telefone: string;

  @IsString()
  @IsEmail()
  email: string;

  // descricao: string;

  @IsString()
  userId: string;
}
