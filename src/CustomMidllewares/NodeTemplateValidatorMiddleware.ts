import HalvaMiddlewareContext from '@halva-suite/halva-spec-builder/dist/HalvaSpecModifier';

export const nodeTemplateValidatorMiddleware = (
  context: HalvaMiddlewareContext
): any => {
  if (!context.jsonSchema.genesis?.runtime?.palletAura?.authorities)
    throw new Error('Invalid JSON');
  if (!context.jsonSchema.genesis?.runtime?.palletGrandpa?.authorities)
    throw new Error('Invalid JSON');

  return context.jsonSchema;
};
