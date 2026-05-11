import { Module } from '@nestjs/common';
import { TopicController } from './topics.controller';
import { TopicService } from './topics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Topic, TopicSchema } from './models';
import { CategoryModule } from '../categories';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Topic.name, schema: TopicSchema },
    ]),
    CategoryModule,
  ],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
