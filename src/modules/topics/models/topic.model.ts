import { Category } from '@/modules/categories';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true })
export class Topic extends Document {
  @Prop({ type: SchemaTypes.String, required: true })
  title: string;

  @Prop({ type: SchemaTypes.String, required: true, unique: true })
  slug: string;

  @Prop({ type: SchemaTypes.Mixed, required: true })
  content: any;

  @Prop({
    type: SchemaTypes.String,
    default: 'draft',
    enum: ['draft', 'published'],
  })
  status: string;

  @Prop({ type: SchemaTypes.String })
  author: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Category;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
