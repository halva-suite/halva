export class SubmittableResultMockFails {
  private section;
  private eventName;
  constructor(section: string, eventName: string) {
    this.section = section;
    this.eventName = eventName;
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
