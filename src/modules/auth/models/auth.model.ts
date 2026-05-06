import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ versionKey: false, timestamps: true, collection: 'admins' })
export class Admin {
  @Prop({ type: SchemaTypes.String, required: true, min: 3, })
  username: string;

  @Prop({ type: SchemaTypes.String, required: true, unique: true })
  email: string;

  @Prop({ type: SchemaTypes.String, required: true })
  password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
