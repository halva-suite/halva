import { SubmittableResultMockFails } from './SubmittableResultMockFails';

export class SubmittableExtrinsicMockFails {
  private section;
  private eventName;
  constructor(section: string, eventName: string) {
    this.section = section;
    this.eventName = eventName;
  }
  // @ts-ignore currently unused local ignore
  public signAndSend(signer, callback) {
    let mock = new SubmittableResultMockFails(this.section, this.eventName, {
      isDropped: false,
      isFinalized: true,
      isInBlock: true,
      isInvalid: false,
      isUsurped: false
    });
    callback(mock);
  }

  public send(callback) {
    let mock = new SubmittableResultMockFails(this.section, this.eventName, {
      isDropped: false,
      isFinalized: true,
      isInBlock: true,
      isInvalid: false,
      isUsurped: false
    });
    callback(mock);
  }
}
