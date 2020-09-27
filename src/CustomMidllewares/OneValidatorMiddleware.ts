import HalvaMiddlewareContext from '@halva-suite/halva-spec-builder/dist/HalvaSpecModifier';

export const oneValidatorMiddleware = (context: HalvaMiddlewareContext): any => {
  if (!context.jsonSchema.genesis?.runtime?.palletStaking?.stakers)
    throw new Error('Invalid JSON');
  if (!context.jsonSchema.genesis?.runtime?.palletSession?.keys)
    throw new Error('Invalid JSON');
  context.jsonSchema.genesis.runtime.palletStaking.stakers = [
    [
      context.sr25519Keys.getPairs()[1].address,
      context.sr25519Keys.getPairs()[0].address,
      10000000000000000,
      'Validator'
    ]
  ];
  context.jsonSchema.genesis.runtime.palletStaking.invulnerables = [context.sr25519Keys.getPairs()[0].address];
  context.jsonSchema.genesis.runtime.palletStaking.minimumValidatorCount = 1;
  context.jsonSchema.genesis.runtime.palletStaking.validatorCount = 1;

  context.jsonSchema.genesis.runtime.palletSession.keys = [
    [
      context.sr25519Keys.getPairs()[0].address,
      context.sr25519Keys.getPairs()[0].address,
      {
        grandpa: context.ed25519Keys.getPairs()[0].address,
        babe: context.sr25519Keys.getPairs()[0].address,
        im_online: context.sr25519Keys.getPairs()[0].address,
        authority_discovery: context.sr25519Keys.getPairs()[0].address
      }
    ]
  ];
  return context.jsonSchema;
};
