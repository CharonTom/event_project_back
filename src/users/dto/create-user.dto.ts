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
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string; // Le mot de passe en clair (à hacher ensuite)

  @IsOptional()
  @IsEnum(['USER', 'ORGANIZER', 'ADMIN'])
  role?: 'USER' | 'ORGANIZER' | 'ADMIN';
}
