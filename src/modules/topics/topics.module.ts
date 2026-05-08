import { Module } from '@nestjs/common';
import { TopicController } from './topics.controller';
import { TopicService } from './topics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Topic, TopicSchema } from './models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Topic.name, schema: TopicSchema },
    ]),
  ],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
