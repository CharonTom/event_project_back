import { Module } from '@nestjs/common';
import { UserCalendarService } from './user-calendar.service';
import { UserCalendarController } from './user-calendar.controller';

@Module({
  controllers: [UserCalendarController],
  providers: [UserCalendarService],
})
export class UserCalendarModule {}
