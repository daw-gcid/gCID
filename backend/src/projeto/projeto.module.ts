import { Module } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { ProjetoController } from './projeto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projeto } from './entities/projeto.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { ClienteService } from 'src/cliente/cliente.service';
import { InstitutoService } from 'src/instituto/instituto.service';
import { Instituto } from 'src/instituto/entities/instituto.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [ProjetoController],
  imports: [TypeOrmModule.forFeature([Projeto, Cliente, Instituto, User])],
  providers: [ProjetoService, ClienteService, InstitutoService, UserService],
  exports: [ProjetoService],
})
export class ProjetoModule {}
