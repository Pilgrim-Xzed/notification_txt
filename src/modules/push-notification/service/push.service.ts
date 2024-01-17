import { FcmClient } from '@/common/clients/fcm';
import { DeviceStatusEvent } from '@/common/events/device-status.event';
import { NewTransactionEvent } from '@/common/events/new-transaction.event';
import { PushMessage } from '@/common/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PushService {
  constructor(private readonly fcmClient: FcmClient) {}

  sendNewTransactionPushNotification(data: NewTransactionEvent) {
    const msg: PushMessage = {
      token: data.deviceId,
      title: 'Transaction Notification',
      body: `${data.method} of ${data.amount} USDC  has been completed`,
      topic: 'IONet HQ',
    };
    this.fcmClient.sendFcmMessage(msg);
  }

  sendDeviceStatusPushNotification(data: DeviceStatusEvent) {
    const msg: PushMessage = {
      token: data.deviceId,
      title: 'Device Status',
      body: `${data.text}`,
      topic: 'IONet HQ',
    };
    this.fcmClient.sendFcmMessage(msg);
  }
}
