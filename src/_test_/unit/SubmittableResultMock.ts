export class SubmittableResultMock {
  private section;
  private eventName;
  constructor(section: string, eventName: string) {
    this.section = section;
    this.eventName = eventName;
  }
  public findRecord(section: string, eventName: string): EventRecordMock {
    if (section == this.section && eventName == this.eventName) {
      return { event: { data: [this.section, this.eventName] } };
    } else {
      return null;
    }
  }
}

export interface EventRecordMock {
  event: EventMock;
}

export interface EventMock {
  data: any[];
}
