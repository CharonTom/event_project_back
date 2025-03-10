import { PartialType } from '@nestjs/mapped-types';
import { CreateUserCalendarDto } from './create-user-calendar.dto';

export class UpdateUserCalendarDto extends PartialType(CreateUserCalendarDto) {}
