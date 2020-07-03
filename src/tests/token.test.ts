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
  
});