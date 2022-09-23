import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(`${__dirname}/config/env/.${process.env.NODE_ENV}.env`),
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
