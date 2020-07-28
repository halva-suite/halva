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
  message: string
) => {
  const record = txResult.findRecord(section, eventName);
  if (record.event.data[0] == null) {
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
  if (record.event.data[0] != null) {
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

export const fails = async (
  asyncFn: SubmittableExtrinsic<ApiTypes>,
  errorName: string,
  module: string,
  signer: KeyringPair,
  message: string
) => {
  const txResult = await getTxResult(asyncFn, signer);
  const err = txResult.findRecord('system', 'ExtrinsicFailed');
  if (!err) {
    const assertionMessage = createAssertionMessage(message, `Did not fail`);
    throw new AssertionError(assertionMessage);
  }
  const errInfo = JSON.parse(err.event.data[0].toString()).Module;
  const txErrorName =
    chainMetadata.asV11.modules[errInfo.index].errors[errInfo.error].name;
  const txModuleName = chainMetadata.asV11.modules[errInfo.index].name;
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
