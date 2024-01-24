export class JobEvent {
  constructor(
    public readonly deviceId: string,
    public readonly email: string,
    public readonly title: string,
    public readonly message: string,
    public readonly amountEarned: string,
    public readonly workerId: string,
    public readonly clusterId: string,
    public readonly timeStamp: string,

  ) { }
}

