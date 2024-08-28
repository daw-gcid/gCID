import { Module } from '@nestjs/common';
import { InstitutoService } from './instituto.service';
import { InstitutoController } from './instituto.controller';
import { Instituto } from './entities/instituto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Proposta } from 'src/propostas/entities/proposta.entity';
import { ProjetoService } from 'src/projeto/projeto.service';
import { PropostasService } from 'src/propostas/propostas.service';
import { Area } from 'src/area/entities/area.entity';
import { AreaService } from 'src/area/area.service';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { ClienteService } from 'src/cliente/cliente.service';

@Module({
  controllers: [InstitutoController],
  imports: [
    TypeOrmModule.forFeature([
      Instituto,
      User,
      Projeto,
      Proposta,
      Area,
      Cliente,
    ]),
  ],
  providers: [
    InstitutoService,
    UserService,
    ProjetoService,
    PropostasService,
    AreaService,
    ClienteService,
  ],
  exports: [InstitutoService],
})
export class InstitutoModule {}
