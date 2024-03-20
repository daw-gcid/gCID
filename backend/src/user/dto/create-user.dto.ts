import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { CreateClienteDto } from 'src/cliente/dto/create-cliente.dto';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Instituto } from 'src/instituto/entities/instituto.entity';
import { Talento } from 'src/talento/entities/talento.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNumber()
  @ApiProperty()
  userType: number;

  @IsOptional()
  @ApiProperty()
  talento?: Talento; // Adicione o campo isTalento como opcional

  @IsOptional()
  @ApiProperty({ type: CreateClienteDto, required: false })
  cliente?: CreateClienteDto; // Adicione o campo isEmpresa como opcional

  @IsOptional()
  @ApiProperty()
  instituto?: Instituto; // Adicione o campo isAdmin como opcional
}
