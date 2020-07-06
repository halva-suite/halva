import { expect } from 'chai';

import config from '../../halva';
import { init } from './../index';

describe('Token runtime', () => {
  before(async () => {
    this.env = await init(config);
  });

  describe('polkadot api', () => {
    it('should have a token api', async () => {
      expect('token' in this.env.polkadot.query).to.be.true;
    });
  });

  describe('getting balances', () => {
    it('should return correct balance', async () => {
      this.env.accounts.map(async (account: any) => {
        console.log(await this.env.polkadot.query.token.balances(account.address));
      });
    });
  });
});