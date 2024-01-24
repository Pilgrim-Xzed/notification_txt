import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { DEVICE_CONNECTION_FAILED, DEVICE_CONNECTION_SUCCESS, DEVICE_STATUS, JOB_COMPLETED, JOB_DESTROYED, JOB_INITIATED, NEW_TRANSACTION } from './common/constants';
import { NewTransactionEvent } from './common/events/new-transaction.event';
import { DeviceStatusEvent } from './common/events/device-status.event';
import { DeviceConnectionEvent } from './common/events/device-connection.event';
import { JobEvent } from './common/events/job.event';

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

  @EventPattern(JOB_INITIATED)
  async handleJobInitiated(data: JobEvent) {
    await this.appService.sendJobInitiatedNotification(data);
  }

  @EventPattern(JOB_COMPLETED)
  async handleJobCompleted(data: JobEvent) {
    await this.appService.sendJobCompletedNotification(data);
  }

  @EventPattern(JOB_DESTROYED)
  async handleJobDestroyed(data: JobEvent) {
    await this.appService.sendJobDestroyedNotification(data);
  }

  @EventPattern(DEVICE_CONNECTION_SUCCESS)
  async handleDeviceConnectionSuccess(data:DeviceConnectionEvent) {
    await this.appService.sendDeviceConnectionSuccess(data);
  }

  @EventPattern(DEVICE_CONNECTION_FAILED)
  async handleDeviceConnectionFailure(data: DeviceConnectionEvent) {
    await this.appService.sendDeviceConnectionFailure(data);
  }
}
