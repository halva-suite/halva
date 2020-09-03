import {
  eventEmitted,
  eventNotEmitted,
  passes,
  fails
} from '../../Assert/Asserts';
import { readFileSync } from 'fs';
import { Metadata } from '@polkadot/types';
import { SubmittableResultMock } from './SubmittableResultMock';
describe('Asserts', () => {
  beforeEach(() => {
    let metadata = JSON.parse(readFileSync('./metaDataMock.json').toString()) as Metadata;
    globalThis.chainMetadata = metadata;
  });

  describe('eventEmitted', () => {
    test('SubmittableResult', async done => {
      let mock = new SubmittableResultMock('test', 'event');
      let result = await eventEmitted(
        mock,
        'test',
        'event',
        'test message',
        null
      );
      expect(result).toBe(true);
      done();
    });

    test('SubmittableResult BAD', async done => {
      let mock = new SubmittableResultMock('test', 'event');
      let result = await eventEmitted(
        mock,
        'test',
        'bad',
        'test message',
        null
      );
      expect(result).toBe(false);
      done();
    });
  });

  describe('eventNotEmitted', () => {
    test('SubmittableResult', async done => {
      let mock = new SubmittableResultMock('test', 'event');
      let result = await eventNotEmitted(
        mock,
        'test',
        'not',
        'test message',
        null
      );
      expect(result).toBe(true);
      done();
    });

    test('SubmittableResult BAD', async done => {
      let mock = new SubmittableResultMock('test', 'event');
      let result = await eventNotEmitted(
        mock,
        'test',
        'event',
        'test message',
        null
      );
      expect(result).toBe(false);
      done();
    });
  });

  describe('passes', () => {
    test('SubmittableResult', async done => {
      let mock = new SubmittableResultMock('test', 'event');
      let result = await passes(mock, 'test message');
      expect(result).toBe(true);
      done();
    });

    test('SubmittableResult BAD', async done => {
      let mock = new SubmittableResultMock('system', 'ExtrinsicFailed');
      let result = await passes(mock, 'test message');
      expect(result).toBe(false);
      done();
    });
  });

  describe('fails', () => {
    test('SubmittableResult', async done => {

      let mock = new SubmittableResultMock('Balances', 'InsufficientBalance');
      let result = await fails(mock, 'InsufficientBalance', 'Balances', null, 'test message');
      expect(result).toBe(true);
      done();
    });
  });
});
