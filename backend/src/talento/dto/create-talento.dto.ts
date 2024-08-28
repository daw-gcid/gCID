import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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

export class CreateTalentoDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  instituicao: string;

  @IsString()
  @IsNotEmpty()
  curso: string;

  @IsNotEmpty()
  //exemplo de dtInicio em datetime: 2021-10-01T00:00:00.000Z
  dtInicio: Date;

  @IsNotEmpty()
  dtFim: Date;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  telefone: string;

  @IsString()
  @IsNotEmpty()
  nacionalidade: string;

  @IsNotEmpty()
  dtNascimento: Date;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsOptional()
  @IsString()
  github?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @ApiProperty()
  pathMatricula: string;

  @ApiProperty()
  pathHistorico: string;

  @IsNotEmpty()
  coeficiente: number;

  @IsArray()
  @IsOptional()
  experiencias?: ExperienciaDto[];

  @IsArray()
  @IsOptional()
  idiomas?: IdiomaDto[];
}

export class ExperienciaDto {
  titulo: string;
  instituicao: string;
  dtInicio: Date;
  dtFim: Date;
  descricao: string;
  habilidades: HabilidadeDto[]; // Adicionando habilidades dentro de ExperienciaDto
}

// DTO para habilidade
export class HabilidadeDto {
  nome: string;
  nivel: number;
}

// DTO para idioma
export class IdiomaDto {
  nome: string;
  nivel: number;
}
