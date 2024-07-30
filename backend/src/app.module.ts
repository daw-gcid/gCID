import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TalentoModule } from './talento/talento.module';
import { ClienteModule } from './cliente/cliente.module';
import { InstitutoModule } from './instituto/instituto.module';
import { ProjetoModule } from './projeto/projeto.module';
import { AreaModule } from './area/area.module';
import { AuthModule } from './auth/auth.module';
import { PropostasModule } from './propostas/propostas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.dev'],
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
    ProjetoModule,
    AreaModule,
    AuthModule,
    PropostasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
