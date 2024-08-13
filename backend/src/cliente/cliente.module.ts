import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Proposta } from 'src/propostas/entities/proposta.entity';
import { PropostasService } from 'src/propostas/propostas.service';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import { ProjetoService } from 'src/projeto/projeto.service';
import { Instituto } from 'src/instituto/entities/instituto.entity';
import { InstitutoService } from 'src/instituto/instituto.service';
import { Area } from 'src/area/entities/area.entity';
import { AreaService } from 'src/area/area.service';

@Module({
  controllers: [ClienteController],
  imports: [
    TypeOrmModule.forFeature([
      Cliente,
      User,
      Proposta,
      Projeto,
      Instituto,
      Area,
    ]),
  ],
  providers: [
    ClienteService,
    UserService,
    PropostasService,
    ProjetoService,
    InstitutoService,
    AreaService,
  ],
  exports: [ClienteService],
})
export class ClienteModule {}
