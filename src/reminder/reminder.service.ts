// src/reminders/reminder.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalendarEvent } from '../calendar-event/entities/calendar-event.entity';
import { User } from '../users/entities/user.entity';
import { Twilio } from 'twilio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReminderService {
  private readonly logger = new Logger(ReminderService.name);
  private twilioClient: Twilio;

  constructor(
    @InjectRepository(CalendarEvent)
    private calendarEventRepository: Repository<CalendarEvent>,
    private config: ConfigService,
  ) {
    // Instanciation du client Twilio
    this.twilioClient = new Twilio(
      this.config.get<string>('TWILIO_ACCOUNT_SID'),
      this.config.get<string>('TWILIO_AUTH_TOKEN'),
    );
  }

  // @Cron('0 */1 * * * *') // Exécute toutes les 2 minutes
  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async handleReminders() {
    this.logger.debug(
      'Lancement de la vérification quotidienne des reminders...',
    );

    const calendarEvents = await this.calendarEventRepository.find({
      relations: ['event', 'calendar', 'calendar.user'],
      where: { wants_reminder: true },
    });

    const today = new Date();

    for (const ce of calendarEvents) {
      const eventStartDate = ce.event.start_date;
      const user: User = ce.calendar.user;

      // 7 jours avant
      if (
        !ce.reminder_7d_sent &&
        this.isReminderDue(eventStartDate, today, 7)
      ) {
        await this.processReminder(ce, user, eventStartDate, '7 jours');
      }

      // 1 jour avant
      if (
        !ce.reminder_1d_sent &&
        this.isReminderDue(eventStartDate, today, 1)
      ) {
        await this.processReminder(ce, user, eventStartDate, '1 jour');
      }
    }
  }

  private async processReminder(
    ce: CalendarEvent,
    user: User,
    eventStartDate: Date,
    reminderType: string,
  ) {
    if (!user.phone) {
      this.logger.warn(
        `L'utilisateur ${user.email} n'a pas de numéro de téléphone.`,
      );
      return;
    }

    try {
      const message = `Rappel : Votre événement "${ce.event.title}" aura lieu le ${eventStartDate.toLocaleString()}.`;
      await this.twilioClient.messages.create({
        body: message,
        from: this.config.get<string>('TWILIO_MESSAGING_SERVICE_SID'),
        to: user.phone,
      });

      // Mise à jour de l’entité
      if (reminderType === '7 jours') {
        ce.reminder_7d_sent = true;
        ce.reminder_7d_sent_at = new Date();
      } else {
        ce.reminder_1d_sent = true;
        ce.reminder_1d_sent_at = new Date();
      }
      await this.calendarEventRepository.save(ce);

      this.logger.log(
        `SMS envoyé à ${user.phone} pour "${ce.event.title}" (${reminderType}). avec pour message : "${message}"`,
      );
    } catch (error) {
      this.logger.error(
        `Erreur lors de l'envoi du SMS à ${user.phone} pour "${ce.event.title}" :`,
        error,
      );
    }
  }

  private isReminderDue(
    eventStartDate: Date,
    currentDate: Date,
    daysBefore: number,
  ): boolean {
    const reminderDate = new Date(eventStartDate);
    reminderDate.setDate(reminderDate.getDate() - daysBefore);

    return (
      reminderDate.getFullYear() === currentDate.getFullYear() &&
      reminderDate.getMonth() === currentDate.getMonth() &&
      reminderDate.getDate() === currentDate.getDate()
    );
  }
}
