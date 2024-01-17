export class DeviceStatusEvent {
    constructor(
      public readonly deviceId: string,
      public readonly email: string,
      public readonly text: string,
      public readonly type: string,
     
    ) {}
  }
  