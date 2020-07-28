import { SubmittableResult } from '@polkadot/api';
import { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';
import { KeyringPair } from '@polkadot/keyring/types';
import { AssertionError } from 'chai';
import {
  sendAndReturnFinalized,
  sendAndReturnSignFinalized
} from '../Deployer/utils';

export const eventEmitted = (
  txResult: SubmittableResult,
  eventName: string,
  section: string,
  message: string,
) => {
  const record = txResult.findRecord(section, eventName);
  if(record.event.data[0] == null) {
    const assertionMessage = createAssertionMessage(
      message,
      `Failed with event was not emitted although it should`
    );
    throw new AssertionError(assertionMessage);
  }
};

export const eventNotEmitted = (
  txResult: SubmittableResult,
  eventName: string,
  section: string,
  message: string
) => {
  const record = txResult.findRecord(section, eventName);
  if(record.event.data[0] != null) {
    const assertionMessage = createAssertionMessage(
      message,
      `Failed with the event was emitted although it shouldn't`
    );
    throw new AssertionError(assertionMessage);
  }

};

export const passes = async (
  asyncFn: SubmittableExtrinsic<ApiTypes>,
  message: string,
  signer?: KeyringPair
): Promise<void> => {
  const txResult = await getTxResult(asyncFn, signer);
  const result = txResult.findRecord('system', ' ExtrinsicFailed');
  if (result) {
    const assertionMessage = createAssertionMessage(
      message,
      `Failed with ${result.event.data[0]}`
    );
    throw new AssertionError(assertionMessage);
  }
};

// export const fails = async (asyncFn: SubmittableExtrinsic<ApiTypes>, ) => {}

const getTxResult = async (
  asyncFn: SubmittableExtrinsic<ApiTypes>,
  signer?: KeyringPair
): Promise<SubmittableResult> => {
  let txResult: SubmittableResult;
  if (signer) {
    txResult = await sendAndReturnFinalized(signer, asyncFn);
  } else {
    txResult = await sendAndReturnSignFinalized(asyncFn);
  }
  return txResult;
};
const createAssertionMessage = (passedMessage, defaultMessage) => {
  let assertionMessage = defaultMessage;
  if (passedMessage) {
    assertionMessage = `${passedMessage} : ${defaultMessage}`;
  }
  return assertionMessage;
};
