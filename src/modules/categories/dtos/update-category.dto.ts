import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @MinLength(3, {message: "Название категории должно быть не менее 3 символов"})
  name: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  parentCategory?: string;

  @IsString()
  @IsOptional()
  slug: string;
}
