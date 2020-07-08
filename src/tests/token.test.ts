import { expect } from 'chai';

describe('Token runtime', () => {
  describe('polkadot api', () => {
    it('should have a token api', async () => {
      expect('token' in halva_polkadot.query).to.be.true;
    });
  });

  describe('getting balances', () => {
    it('should return correct balance', async () => {
      halva_accounts.map(async (account: any) => {
        console.log(await halva_polkadot.query.token.balances(account.address));
      });
    });
  });
});
