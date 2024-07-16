import { Module } from '@nestjs/common';
import { InstitutoService } from './instituto.service';
import { InstitutoController } from './instituto.controller';
import { Instituto } from './entities/instituto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [InstitutoController],
  imports: [TypeOrmModule.forFeature([Instituto, User])],
  providers: [InstitutoService, UserService],
  exports: [InstitutoService],
})
export class InstitutoModule {}
