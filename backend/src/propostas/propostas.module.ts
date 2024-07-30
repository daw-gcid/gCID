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

@Module({
  imports: [TypeOrmModule.forFeature([Proposta, Projeto, Cliente, Instituto])],
  controllers: [PropostasController],
  providers: [
    PropostasService,
    ProjetoService,
    ClienteService,
    InstitutoService,
  ],
  exports: [PropostasService],
})
export class PropostasModule {}
