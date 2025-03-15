import { IsNumber, IsBoolean } from 'class-validator';

export class AddEventToCalendarRequestDto {
  @IsNumber()
  event_id: number;

  @IsBoolean()
  wants_reminder: boolean;
}
