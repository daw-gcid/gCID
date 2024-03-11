import { Module } from '@nestjs/common';
import { TalentoService } from './talento.service';
import { TalentoController } from './talento.controller';

@Module({
  controllers: [TalentoController],
  providers: [TalentoService],
})
export class TalentoModule {}
