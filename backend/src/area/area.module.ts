import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './entities/area.entity';

@Module({
  controllers: [AreaController],
  imports: [TypeOrmModule.forFeature([Area])],
  providers: [AreaService],
  exports: [AreaService],
})
export class AreaModule {}
