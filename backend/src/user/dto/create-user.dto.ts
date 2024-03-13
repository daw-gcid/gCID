import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Instituto } from 'src/instituto/entities/instituto.entity';
import { Talento } from 'src/talento/entities/talento.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNumber()
  userType: number;

  @IsOptional()
  talento?: Talento; // Adicione o campo isTalento como opcional

  @IsOptional()
  cliente?: Cliente; // Adicione o campo isEmpresa como opcional

  @IsOptional()
  instituto?: Instituto; // Adicione o campo isAdmin como opcional
}
