import { SubmittableResult } from '@polkadot/api';
import { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';
import { KeyringPair } from '@polkadot/keyring/types';
import { AssertionError } from 'chai';
import {
  sendAndReturnFinalized,
  sendAndReturnSignFinalized
} from '../Deployer/utils';
export const eventEmitted = async (
  asyncFn: any,
  eventName: string,
  section: string,
  message: string,
  signer: KeyringPair
) => {
  let txResult: SubmittableResult;
  if (SubmittableResultOf(asyncFn)) {
    txResult = asyncFn;
  } else if (SubmittableExtrinsicOf(asyncFn)) {
    txResult = await getTxResult(asyncFn, signer);
  } else {
    throw new AssertionError('Bad type');
  }
  const record = txResult.findRecord(section, eventName);
  if (record.event.data[0] == null) {
    const assertionMessage = createAssertionMessage(
      message,
      `Failed with event was not emitted although it should`
    );
    throw new AssertionError(assertionMessage);
  }
};

export const eventNotEmitted = async (
  asyncFn: any,
  eventName: string,
  section: string,
  message: string,
  signer: KeyringPair
) => {
  let txResult: SubmittableResult;
  if (SubmittableResultOf(asyncFn)) {
    txResult = asyncFn;
  } else if (SubmittableExtrinsicOf(asyncFn)) {
    txResult = await getTxResult(asyncFn, signer);
  } else {
    throw new AssertionError('Bad type');
  }
  const record = txResult.findRecord(section, eventName);
  if (record?.event?.data[0] != null) {
    const assertionMessage = createAssertionMessage(
      message,
      `Failed with the event was emitted although it shouldn't`
    );
    throw new AssertionError(assertionMessage);
  }
};

export const passes = async (
  asyncFn: any,
  message: string,
  signer?: KeyringPair
): Promise<void> => {
  let txResult: SubmittableResult;
  if (SubmittableResultOf(asyncFn)) {
    txResult = asyncFn;
  } else if (SubmittableExtrinsicOf(asyncFn)) {
    txResult = await getTxResult(asyncFn, signer);
  } else {
    throw new AssertionError('Bad type');
  }
  const result = txResult.findRecord('system', 'ExtrinsicFailed');
  if (result?.event?.data[0]) {
    const assertionMessage = createAssertionMessage(
      message,
      `Failed with ${result.event.data[0]}`
    );
    throw new AssertionError(assertionMessage);
  }
};

export const fails = async (
  asyncFn: any,
  errorName: string,
  module: string,
  signer: KeyringPair,
  message: string
) => {
  let txResult: SubmittableResult;
  if (SubmittableResultOf(asyncFn)) {
    txResult = asyncFn;
  } else if (SubmittableExtrinsicOf(asyncFn)) {
    txResult = await getTxResult(asyncFn, signer);
  } else {
    throw new AssertionError('Bad type');
  }
  const err = txResult.findRecord('system', 'ExtrinsicFailed');
  if (err?.event?.data[0]) {
    const assertionMessage = createAssertionMessage(message, `Did not fail`);
    throw new AssertionError(assertionMessage);
  }
  const errInfo = JSON.parse(err.event.data[0].toString()).Module;
  const txErrorName =
    globalThis.chainMetadata.asV11.modules[errInfo.index].errors[errInfo.error]
      .name;
  const txModuleName =
    globalThis.hainMetadata.asV11.modules[errInfo.index].name;
  if (
    errorName != txErrorName.toString() ||
    module != txModuleName.toString()
  ) {
    const assertionMessage = createAssertionMessage(
      message,
      `Expected to fail with ${module}, but failed with: ${errorName}`
    );
    throw new AssertionError(assertionMessage);
  }
};

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

const SubmittableExtrinsicOf = (val: any): boolean => {
  return (val as SubmittableExtrinsic<ApiTypes>).signAndSend != undefined;
};

const SubmittableResultOf = (val: any): boolean => {
  return (val as SubmittableResult).findRecord != undefined;
};
