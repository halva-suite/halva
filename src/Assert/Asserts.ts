import { SubmittableResult } from '@polkadot/api';

export const eventEmitted = (
  txResult: SubmittableResult,
  eventName: string,
  section: string
): boolean => {
  const record = txResult.findRecord(section, eventName);
  return record.event.data[0] != null;
};

export const eventNotEmitted = (
  txResult: SubmittableResult,
  eventName: string,
  section: string
): boolean => {
  const record = txResult.findRecord(section, eventName);
  return record.event.data[0] == null;
};
