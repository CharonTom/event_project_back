import { Test, TestingModule } from '@nestjs/testing';
import { UserCalendarService } from './user-calendar.service';

describe('UserCalendarService', () => {
  let service: UserCalendarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCalendarService],
    }).compile();

    service = module.get<UserCalendarService>(UserCalendarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
