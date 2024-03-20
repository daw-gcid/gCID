import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import * as connectRedis from 'connect-redis';
import * as redis from 'redis';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const client = redis.createClient({ url: process.env.REDIS_URI });

  const RedisStore = connectRedis(session);

  app.enableCors({
    origin: ['http://localhost'], // Substitua com a origem do seu cliente
    credentials: true, // Permite credenciais
  });

  app.use(
    session({
      name: 'session',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({
        client,
        ttl: 86400,
      }),
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Api Gcid')
    .setDescription('The GCID API description')
    .setVersion('1.0')
    .addTag('Gcid')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
