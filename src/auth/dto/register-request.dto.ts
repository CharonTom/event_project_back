import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Role } from '../../auth/enums/role.enum';

export class RegisterRequestDto {
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
  @Transform(({ value }) => value.toLowerCase().trim())
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string; // Le mot de passe en clair (à hacher ensuite)

  @IsOptional()
  @IsEnum(Role) // Utilisez l'énumération Role
  role?: Role; // Utilisez le type Role
}
