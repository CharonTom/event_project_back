import { IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class AddEventToCalendarRequestDto {
  @IsNumber()
  event_id: number;

  @IsBoolean()
  wants_reminder: boolean;
}
