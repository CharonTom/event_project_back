// src/reminders/reminder.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalendarEvent } from '../calendar-event/entities/calendar-event.entity';
import { User } from '../users/entities/user.entity';
// import Twilio from 'twilio';

@Injectable()
export class ReminderService {
  private readonly logger = new Logger(ReminderService.name);
  //   private twilioClient: Twilio;

  constructor(
    @InjectRepository(CalendarEvent)
    private calendarEventRepository: Repository<CalendarEvent>,
  ) {
    // Initialisation du client Twilio avec les variables d'environnement
    // this.twilioClient = new Twilio(
    //   process.env.TWILIO_ACCOUNT_SID as string,
    //   process.env.TWILIO_AUTH_TOKEN as string,
    // );
  }

  //    Planification CRON, vérifie les reminders.

  //   @Cron('*/10 * * * * *')
  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async handleReminders() {
    this.logger.debug(
      'Lancement de la vérification quotidienne des reminders...',
    );

    // Récupération des CalendarEvents qui demandent un rappel
    const calendarEvents = await this.calendarEventRepository.find({
      relations: ['event', 'calendar', 'calendar.user'],
      where: { wants_reminder: true },
    });

    const today = new Date();

    for (const ce of calendarEvents) {
      const eventStartDate = ce.event.start_date;
      const user: User = ce.calendar.user;

      // Vérifier si le rappel 7 jours avant doit être envoyé
      if (
        !ce.reminder_7d_sent &&
        this.isReminderDue(eventStartDate, today, 7)
      ) {
        if (user.phone) {
          await this.sendReminder(
            user.phone,
            ce.event.title,
            eventStartDate,
            '7 jours',
          );
          ce.reminder_7d_sent = true;
          ce.reminder_7d_sent_at = new Date();
          await this.calendarEventRepository.save(ce);
        } else {
          this.logger.warn(
            `L'utilisateur ${user.email} n'a pas de numéro de téléphone.`,
          );
        }
      }

      // Vérifier si le rappel 1 jour avant doit être envoyé
      if (
        !ce.reminder_1d_sent &&
        this.isReminderDue(eventStartDate, today, 1)
      ) {
        if (user.phone) {
          await this.sendReminder(
            user.phone,
            ce.event.title,
            eventStartDate,
            '1 jour',
          );
          ce.reminder_1d_sent = true;
          ce.reminder_1d_sent_at = new Date();
          await this.calendarEventRepository.save(ce);
        } else {
          this.logger.warn(
            `L'utilisateur ${user.email} n'a pas de numéro de téléphone.`,
          );
        }
      }
    }
  }

  // Construit le message
  private async sendReminder(
    phone: string,
    eventTitle: string,
    eventStart: Date,
    reminderType: string,
  ) {
    const messageBody = `Rappel (${reminderType}) : Votre événement "${eventTitle}" aura lieu le ${eventStart.toLocaleString()}.`;

    try {
      //   await this.twilioClient.messages.create({
      //     body: messageBody,
      //     from: process.env.TWILIO_PHONE_NUMBER,
      //     to: phone,
      //   });
      this.logger.log(
        `SMS envoyé à ${phone} pour l'événement "${eventTitle}" (${reminderType}) with ===> ${messageBody}`,
      );
    } catch (error) {
      this.logger.error(
        `Erreur lors de l'envoi du SMS à ${phone} pour l'événement "${eventTitle}" :`,
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
