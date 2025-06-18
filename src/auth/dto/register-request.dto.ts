import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsEnum,
  IsOptional,
  Length,
  Matches,
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
  @Length(8, 20, {
    message: 'Le mot de passe doit contenir entre 8 et 20 caractères',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Le mot de passe doit contenir au moins une majuscule',
  })
  @Matches(/(?=.*\d)/, {
    message: 'Le mot de passe doit contenir au moins un chiffre',
  })
  password: string; // Le mot de passe en clair (à hacher ensuite)

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
