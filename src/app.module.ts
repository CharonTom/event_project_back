import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guards/jwt.guard';
import { RolesGuard } from './auth/guards/role.guard';
import { JwtStrategy } from './auth/strategy/jwt.strategy';

import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { CategoriesModule } from './categories/categories.module';
import { CalendarModule } from './calendar/calendar.module';
import { CalendarEventModule } from './calendar-event/calendar-event.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ReminderModule } from './reminder/reminder.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    EventsModule,
    CategoriesModule,
    CalendarModule,
    CalendarEventModule,
    AuthModule,
    ReminderModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },

    JwtStrategy,
    RolesGuard,
  ],
})
export class AppModule {}
