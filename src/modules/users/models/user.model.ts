import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ versionKey: false, timestamps: true, collection: 'users' })
export class User {
  @Prop({ type: SchemaTypes.String, required: true, min: 3, })
  username: string;

  @Prop({ type: SchemaTypes.String, required: true, unique: true })
  email: string;

  @Prop({ type: SchemaTypes.String, required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
