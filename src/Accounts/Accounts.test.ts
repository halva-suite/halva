import { expect } from 'chai';
import { generateAccounts } from './Accounts';

describe('Accounts', () => {
  it('should generate determinate accounts', async () => {
    const addresses = (
      await generateAccounts(
        10,
        'bottom drive obey lake curtain smoke basket hold race lonely fit walk'
      )
    ).map(a => a.address);

    expect(addresses).to.deep.equal([
      '5DwKZ3w58GsQ9z3a6Z4kxVkbRbAKwrqCMXVv1B9hj8xrQewQ',
      '5HgHERTtCtWUzn6zCvYQpzRDYphKEXKysJWM6JcwVkmpek1L',
      '5GWfv2WwpYgeHNziCBYAKxudKaVG9asdvjpeQkN9Sdn7UJXD',
      '5CccSSSvPCaiXDKZ8Duyoux9WFoihMTp1xnxVL3JqRf75vyT',
      '5FjSTZKwt1AbE9jpVVQrxv9iemXf9tRbxDuetE5EzBvnQrN8',
      '5CqfMFYZQNZsA6onxoGoBbvN1TFZLiKPHfuXJbsjMzWamAUR',
      '5FXJsNRTq5KfeZAM1MMKGfgXyQYbod5zamajZ1fX5zt3HVbk',
      '5DRXspTjPNCXgFb16HBACB7THozFmwM2KMqo3ptCZg5bmxuD',
      '5HRBYsoquQmXFHQ1JzX9qM1vCZ46hXkbLZ3ZCAUvaJjKa991',
      '5FqDomT17FucKQQXpFhJL2Q4JFx6YWmNfM2SDDW4XRsjFhG7'
    ]);
  });
});
