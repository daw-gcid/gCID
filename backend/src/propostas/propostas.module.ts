import { Module } from '@nestjs/common';
import { PropostasService } from './propostas.service';
import { PropostasController } from './propostas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposta } from './entities/proposta.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Instituto } from 'src/instituto/entities/instituto.entity';
import { ProjetoService } from 'src/projeto/projeto.service';
import { ClienteService } from 'src/cliente/cliente.service';
import { InstitutoService } from 'src/instituto/instituto.service';
import { Area } from 'src/area/entities/area.entity';
import { AreaService } from 'src/area/area.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Proposta,
      Projeto,
      Cliente,
      Instituto,
      Area,
      User,
    ]),
  ],
  controllers: [PropostasController],
  providers: [
    PropostasService,
    ProjetoService,
    ClienteService,
    InstitutoService,
    AreaService,
    UserService,
  ],
  exports: [PropostasService, ClienteService],
})
export class PropostasModule {}
