import { Module } from '@nestjs/common';
import { TalentoService } from './talento.service';
import { TalentoController } from './talento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talento } from './entities/talento.entity';
import { UserService } from 'src/user/user.service';
import { Experiencia } from './entities/experiencia.entity';
import { Idioma } from './entities/idioma.entity';
import { Habilidade } from './entities/habilidade.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [TalentoController],
  imports: [
    TypeOrmModule.forFeature([Talento, Experiencia, Idioma, Habilidade, User]),
  ],
  providers: [TalentoService, UserService],
})
export class TalentoModule {}
