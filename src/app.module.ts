import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from '@/modules/categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate(config) {
        if (!config.MONGO_URL) {
          throw new Error('MONGO_URL is not set in .env file');
        }
        return config;
      },
    }),
    MongooseModule.forRoot(process.env.MONGO_URL as string),
    CategoryModule,
  ],
})
export class AppModule {}
