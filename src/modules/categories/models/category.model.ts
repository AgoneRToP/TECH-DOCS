import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ versionKey: false, timestamps: true, collection: 'categories' })
export class Category {
  @Prop({ type: SchemaTypes.String, required: true, min: 3 })
  name: string;

  @Prop({ type: SchemaTypes.String, required: false, allowNull: true, default: null })
  icon?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category' })
  parentCategory?: string | Category;

  @Prop({ ype: SchemaTypes.String, required: true, unique: true, lowercase: true })
  slug: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
