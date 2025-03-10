import { Test, TestingModule } from '@nestjs/testing';
import { UserCalendarController } from './user-calendar.controller';
import { UserCalendarService } from './user-calendar.service';

describe('UserCalendarController', () => {
  let controller: UserCalendarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCalendarController],
      providers: [UserCalendarService],
    }).compile();

    controller = module.get<UserCalendarController>(UserCalendarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
