import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    if (typeof value === 'number') {
      return value.toString().trim();
    }
    return value.trim();
  })
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    if (typeof value === 'number') {
      return value.toString().trim();
    }
    return value.trim();
  })
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string; // Le mot de passe en clair (à hacher ensuite)

  @IsOptional()
  @IsEnum(['USER', 'ADMIN'])
  role?: 'USER' | 'ADMIN';
}
