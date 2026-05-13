import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors';
import { HttpExceptionFilter } from './common/filters';
import cookieParser from 'cookie-parser';
import { readFileSync, readdirSync } from 'fs';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const hbs = require('hbs');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser(process.env.COOKIE_SECRET));

  app.useStaticAssets(join(__dirname, 'public'));
  app.setBaseViewsDir(join(__dirname, 'views'));
  app.setViewEngine('hbs');

  // Partials ni sinxron ro'yxatdan o'tkazish
  const partialsDir = join(__dirname, 'views', 'partials');
  readdirSync(partialsDir).forEach((file) => {
    if (file.endsWith('.hbs')) {
      const name = file.replace('.hbs', '');
      const template = readFileSync(join(partialsDir, file), 'utf8');
      hbs.registerPartial(name, template);
    }
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipNullProperties: true,
      skipUndefinedProperties: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.PORT ?? 3000;
  await app.listen(port, () => {
    console.log(`🚀 Приложение работает на: http://localhost:${port}`);
  });
}
bootstrap();
