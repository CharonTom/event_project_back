import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  parent_category_id?: number;
}
