import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ versionKey: false, timestamps: true, collection: 'categories' })
export class Category {
  @Prop({ type: SchemaTypes.String, required: true, min: 3, unique: true })
  name: string;

  @Prop({ type: SchemaTypes.String, required: false, allowNull: true })
  icon?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category' })
  category?: string | Category;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
