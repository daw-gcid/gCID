import { Module } from '@nestjs/common';
import { InstitutoService } from './instituto.service';
import { InstitutoController } from './instituto.controller';

@Module({
  controllers: [InstitutoController],
  providers: [InstitutoService],
})
export class InstitutoModule {}
