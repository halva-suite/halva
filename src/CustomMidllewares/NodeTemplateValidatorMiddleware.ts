import HalvaMiddlewareContext from '@halva-suite/halva-spec-builder/dist/HalvaSpecModifier';

export const nodeTemplateValidatorMiddleware = (
  context: HalvaMiddlewareContext
): any => {
  if (!context.jsonSchema.genesis?.runtime?.palletAura?.authorities)
    throw new Error('Invalid JSON');
  if (!context.jsonSchema.genesis?.runtime?.palletGrandpa?.authorities)
    throw new Error('Invalid JSON');
  const pairsAura = context.sr25519Keys.getPairs();
  context.jsonSchema.genesis.runtime.palletAura.authorities = [
    pairsAura[0].address
  ];
  const pairsGrandpa = context.ed25519Keys.getPairs();
  context.jsonSchema.genesis.runtime.palletGrandpa.authorities = [
    [pairsGrandpa[0].address, 1]
  ];
  return context.jsonSchema;
};
