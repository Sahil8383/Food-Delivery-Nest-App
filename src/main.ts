import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('from Work-Ubantu 6');
  await app.listen(3000);
}
bootstrap();
