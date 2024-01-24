import { Injectable, Logger } from '@nestjs/common';
import { NewTransactionEvent } from './common/events/new-transaction.event';
import { MailService } from './modules/mail/service/mail.service';
import { PushService } from './modules/push-notification/service/push.service';
import { ConfigService } from '@nestjs/config';
import {
  MAIL_FROM,
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_PORT,
  MAIL_USER,
} from './common/constants';
import { DeviceStatusEvent } from './common/events/device-status.event';
import { JobEvent } from './common/events/job.event';
import { DeviceConnectionEvent } from './common/events/device-connection.event';

@Injectable()
export class AppService {
  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {
    Logger.log(this.configService.getOrThrow(MAIL_HOST));
    Logger.log(configService.getOrThrow(MAIL_PORT));
    Logger.log(configService.getOrThrow(MAIL_USER));
    Logger.log(configService.getOrThrow(MAIL_PASSWORD));
    Logger.log(configService.get(MAIL_FROM));
  }


  sendNewTransactionNotification(newTransactionEvent: NewTransactionEvent) {
    const { email, ...rest } = newTransactionEvent;

    this.mailService.sendNewTransactionEmail(email, rest);
 
  }

  sendDeviceStatusNotification(newTransactionEvent: DeviceStatusEvent) {
    console.log("Received device status event");
    const { email, ...rest } = newTransactionEvent;

    this.mailService.sendDeviceStatusEmail(email, rest);

  }

  sendJobInitiatedNotification(newTransactionEvent: JobEvent) {
    console.log("Received job Initiated event");
    const { email, ...rest } = newTransactionEvent;
    
    this.mailService.sendJobInitiatedEmail(email, rest);

  }

  sendJobCompletedNotification(newTransactionEvent: JobEvent) {
    console.log("Received job Completion event");
    const { email, ...rest } = newTransactionEvent;

    this.mailService.sendJobCompletedEmail(email, rest);

  }

  sendJobDestroyedNotification(newTransactionEvent: JobEvent) {
    console.log("Received job Destroyed event");
    const { email, ...rest } = newTransactionEvent;

    this.mailService.sendJobDestroyedEmail(email, rest);

  }

  sendDeviceConnectionSuccess(deviceConnectionSuccessEvent: DeviceConnectionEvent) {
    console.log("Received device connection status event");
    const { email, ...rest } = deviceConnectionSuccessEvent;

    this.mailService.sendDeviceConnectionSuccessMail(email, rest);

  }


  sendDeviceConnectionFailure(deviceConnectionFailureEvent: DeviceConnectionEvent) {
    console.log("Received device connection status event");
    const { email, ...rest } = deviceConnectionFailureEvent;

    this.mailService.sendDeviceConnectionFailureMail(email, rest);

  }



}
