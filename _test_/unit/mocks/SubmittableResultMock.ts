export class SubmittableResultMock {
  private section;
  private eventName;
  public status: StatusMock;

  constructor(section: string, eventName: string, status?: StatusMock) {
    this.section = section;
    this.eventName = eventName;
    this.status = status;
  }

  public findRecord(section: string, eventName: string): EventRecordMock {
    if (section == this.section && eventName == this.eventName) {
      return { event: { data: [this.section, this.eventName] } };
    } else {
      return { event: { data: [] } };
    }
  }
}

export interface EventRecordMock {
  event: EventMock;
}

export interface EventMock {
  data: any[];
}

export interface StatusMock {
  isInBlock: boolean;
  isFinalized: boolean;
  isDropped: boolean;
  isInvalid: boolean;
  isUsurped: boolean;
}
