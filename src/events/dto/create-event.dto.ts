import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class CreateEventDto {
  // Optionnel, car un événement peut être importé d'un autre service
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  start_date: Date;

  @IsNotEmpty()
  @IsDateString()
  end_date: Date;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  // Champs de paiement (optionnels lors de la création, souvent mis à jour ensuite)
  @IsOptional()
  @IsBoolean()
  is_sponsored?: boolean;

  @IsOptional()
  @IsNumber()
  paid_amount?: number;

  @IsOptional()
  @IsDateString()
  payment_date?: Date;

  @IsOptional()
  @IsNumber()
  paid_by_user?: number;

  // Optionnel : liste des IDs de catégories associées à l'événement
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  category_ids?: number[];
}
