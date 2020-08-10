describe('Halva test', () => {
  describe('test global', () => {
    it('Get global var', async () => {
        console.log(halva_accounts[0].address);
    });
  });
});

describe('Transfer balance', () => {

  it('Transfer balance to bob(fails)', async () => {
    const tx = halva.polkadot.tx.balances.transfer(bobPair.address, '100000000000000000000000000000000000000');
    await fails(tx, 'InsufficientBalance', 'Balances', alicePair);
  });
  it('Transfer balance to bob(passes)', async () => {
    const tx = halva.polkadot.tx.balances.transfer(bobPair.address, '10000000');
    await passes(tx, 'Send', alicePair);
  });
  it('Transfer balance to bob(eventEmitted)', async () => {
    const tx = halva.polkadot.tx.balances.transfer(bobPair.address, '10000000');
    await eventEmitted(tx,  'Transfer', 'balances', 'Check event', alicePair);
  });
  it('Transfer balance to bob(eventNotEmitted)', async () => {
    const tx = halva.polkadot.tx.balances.transfer(bobPair.address, '10000000');
    await eventNotEmitted(tx,  'ExtrinsicFailed', 'system', 'Check bad event', alicePair);
  });
});
