import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule, AuthModule, TopicModule } from '@/modules';
import { LoggerMiddleware } from './common/middlewares';
import { RolesGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate(config) {
        if (!config.MONGO_URL) {
          throw new Error('MONGO_URL не установлена в файле .env');
        }
        return config;
      },
    }),
    MongooseModule.forRoot(process.env.MONGO_URL as string),
    AuthModule,
    CategoryModule,
    TopicModule,
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard,
  //   },
  // ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
