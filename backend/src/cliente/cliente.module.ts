import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [ClienteController],
  imports: [TypeOrmModule.forFeature([Cliente, User])],
  providers: [ClienteService, UserService],
  exports: [ClienteService],
})
export class ClienteModule {}
