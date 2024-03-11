import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TalentoModule } from './talento/talento.module';
import { ClienteModule } from './cliente/cliente.module';
import { InstitutoModule } from './instituto/instituto.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [`${__dirname}/**/*.entity{.js, .ts}`],
      migrations: [`${__dirname}/migrations/{.ts, *.js}`],
      migrationsRun: true,
      synchronize: true,
    }),
    UserModule,
    TalentoModule,
    ClienteModule,
    InstitutoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
