import {
  eventEmitted,
  eventNotEmitted,
  passes,
  fails
} from '../../src/Assert/Asserts';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { Metadata } from '@polkadot/types';
import { SubmittableResultMock } from './mocks/SubmittableResultMock';
import { SubmittableExtrinsicMock } from './mocks/SubmittableExtrinsicMock';
import {describe, expect, test} from '@jest/globals';
import { SubmittableResultMockFails } from './mocks/SubmittableResultMockFails';
describe('Asserts', () => {
  beforeEach(() => {
    let metadata = JSON.parse(readFileSync(resolve('./_test_/unit/mocks/metaDataMock.json')).toString()) as Metadata;
    globalThis.chainMetadata = metadata;
  });

  describe('eventEmitted', () => {
    test('SubmittableResult', async done => {
      let mock = new SubmittableResultMock('test', 'event');
      await expect(eventEmitted(
        mock,
        'event',
        'test',
        'test message',
        null
      )).resolves.not.toThrow();
      done();
    });

    test('SubmittableResult BAD', async done => {
      let mock = new SubmittableResultMock('test', 'event');
      await expect(eventEmitted(
        mock,
        'bad',
        'test',
        'test message',
        null
      )).rejects.toThrow();
      done();
    });

    test('SubmittableExtrinsic', async done => {
      let mock = new SubmittableExtrinsicMock('test', 'event');
      await expect(eventEmitted(
        mock,
        'event',
        'test',
        'test message',
        null
      )).resolves.not.toThrow();
      done();
    });

    test('SubmittableExtrinsic BAD', async done => {
      let mock = new SubmittableExtrinsicMock('test', 'event');
      await expect(eventEmitted(
        mock,
        'bad',
        'test',
        'test message',
        null
      )).rejects.toThrow();
      done();
    });
  });

  describe('eventNotEmitted', () => {
    test('SubmittableResult', async done => {
      let mock = new SubmittableResultMock('test', 'event');
      await expect( eventNotEmitted(
        mock,
        'not',
        'test',
        'test message',
        null
      )).resolves.not.toThrow();
      done();
    });

    test('SubmittableResult BAD', async done => {
      let mock = new SubmittableResultMock('test', 'event');
      await expect( eventNotEmitted(
        mock,
        'event',
        'test',
        'test message',
        null
      )).rejects.toThrow();
      done();
    });

    test('SubmittableExtrinsic', async done => {
      let mock = new SubmittableExtrinsicMock('test', 'event');
      await expect(eventNotEmitted(
        mock,
        'not',
        'test',
        'test message',
        null
      )).resolves.not.toThrow();
      done();
    });

    test('SubmittableExtrinsic BAD', async done => {
      let mock = new SubmittableExtrinsicMock('test', 'event');
      await expect(eventNotEmitted(
        mock,
        'event',
        'test',
        'test message',
        null
      )).rejects.toThrow();
      done();
    });

  });

  describe('passes', () => {
    test('SubmittableResult', async done => {
      let mock = new SubmittableResultMock('test', 'event');
      await expect( passes(
        mock,
        'test message'
      )).resolves.not.toThrow();
      done();
    });

    test('SubmittableResult BAD', async done => {
      let mock = new SubmittableResultMock('system', 'ExtrinsicFailed');
      await expect( passes(
        mock,
        'test message'
      )).rejects.toThrow();
      done();
    });

    test('SubmittableExtrinsic BAD', async done => {
      let mock = new SubmittableExtrinsicMock('system', 'ExtrinsicFailed');
      await expect(passes(
        mock,
        'test message'
      )).rejects.toThrow();
      done();
    });

    test('SubmittableExtrinsic BAD', async done => {
      let mock = new SubmittableExtrinsicMock('test', 'event');
      await expect(passes(
        mock,
        'test message'
      )).resolves.not.toThrow();
      done();
    });
  });

  describe('fails', () => {
    test('SubmittableResult', async done => {
      let mock = new SubmittableResultMockFails('Balances', 'InsufficientBalance');
      await expect( fails(mock, 'InsufficientBalance', 'Balances', null, 'test message')).rejects.toThrow();
      done();
    });

    test('SubmittableResult BAD', async done => {
      let mock = new SubmittableResultMockFails('system', 'ExtrinsicFailed');
      await expect( fails(mock, 'InsufficientBalance', 'Balances', null, 'test message')).rejects.toThrow();
      done();
    });
  });
});
