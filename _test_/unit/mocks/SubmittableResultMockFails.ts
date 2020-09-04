export class SubmittableResultMockFails {
  private section;
  private eventName;
  public status: StatusMock;
  constructor(section: string, eventName: string, status?: StatusMock) {
    this.section = section;
    this.eventName = eventName;
    this.status = status;
  }
  public findRecord(section: string, eventName: string): EventRecordMockFails {
    if (section == this.section && eventName == this.eventName) {
      return { event: { data: [new DataMock()] } };
    } else {
      return { event: { data: [] } };
    }
  }
}

export interface EventRecordMockFails {
  event: EventMockFails;
}

export interface EventMockFails {
  data: DataMock[];
}

export class DataMock {
  public toString() {
    return '{"Module" : { "error": 3, "index": 6 } }';
  }
}
export interface StatusMock {
  isInBlock: boolean;
  isFinalized: boolean;
  isDropped: boolean;
  isInvalid: boolean;
  isUsurped: boolean;
}
