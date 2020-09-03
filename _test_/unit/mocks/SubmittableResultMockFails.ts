export class SubmittableResultMockFails {
  private section;
  private eventName;
  public status: StatusMock;

  constructor(section: string, eventName: string, status? :StatusMock) {
    this.section = section;
    this.eventName = eventName;
    this.status = status;
  }
  public findRecord(section: string, eventName: string): EventRecordMockFails {
    if (section == this.section && eventName == this.eventName) {
      return { event: { data: [this.section, this.eventName] } };
    } else {
      return { event: { data: [] } };
    }
  }
}

export interface EventRecordMockFails  {
  event: EventMockFails;
}

export interface EventMockFails  {
  data: any[];
}

export interface StatusMock  {
  isInBlock: boolean;
  isFinalized: boolean;
  isDropped: boolean;
  isInvalid: boolean;
  isUsurped: boolean;
}
