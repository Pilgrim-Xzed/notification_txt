import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { DEVICE_STATUS, NEW_TRANSACTION } from './common/constants';
import { NewTransactionEvent } from './common/events/new-transaction.event';
import { DeviceStatusEvent } from './common/events/device-status.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @EventPattern(NEW_TRANSACTION)
  async handleNewTransaction(data: NewTransactionEvent) {
    await this.appService.sendNewTransactionNotification(data);
  }

  @EventPattern(DEVICE_STATUS)
  async handleDeviceStatusChange(data: DeviceStatusEvent) {
    await this.appService.sendDeviceStatusNotification(data);
  }
}
