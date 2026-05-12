import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CategoryModule,
  AuthModule,
  TopicModule,
  UsersModule,
} from '@/modules';
import { LoggerMiddleware } from './common/middlewares';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './common/guards';
// import { APP_GUARD } from '@nestjs/core';

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
    JwtModule.register({
      secret: 'your-secret', 
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forRoot(process.env.MONGO_URL as string),
    AuthModule,
    UsersModule,
    CategoryModule,
    TopicModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
