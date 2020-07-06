import { expect } from 'chai';

import { init } from './../index';

describe('Token runtime', () => {
  before(async () => {
    this.env = await init('./../index');
  });

  describe('polkadot api', () => {
    it('should have a token api', async () => {
      expect('token' in this.env.polkadot.query).to.be.true;
    });
  });

});