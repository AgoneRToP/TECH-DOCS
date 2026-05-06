import { Category } from '@/modules/categories';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Topic extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ type: Object, required: true })
  content: any;

  @Prop({ default: 'draft', enum: ['draft', 'published'] })
  status: string;

  @Prop()
  author: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category', required: true })
  category: Category;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);