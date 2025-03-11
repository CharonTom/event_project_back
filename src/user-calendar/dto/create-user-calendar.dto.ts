import { IsNotEmpty, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserCalendarDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  event_id: number;

  @IsOptional()
  @IsBoolean()
  wants_reminder?: boolean;
}
