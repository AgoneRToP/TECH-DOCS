import { Category } from "@/modules/categories";
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateTopicDto {
  @IsString()
  @MinLength(3, { message: 'Название топика должно быть не менее 3 символов' })
  title: string;

  @IsString()
  slug: string;

  @IsNotEmpty({ message: 'Контент топика не может быть пустым' })
  content: any;

  @IsOptional()
  @IsString()
  author?: string;

  @IsString()
  category: Category;
}