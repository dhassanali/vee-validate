import { computed, inject, unref } from 'vue';
import { FieldContext, FormSymbol } from './symbols';
import { MaybeReactive } from './types';
import { injectWithSelf, normalizeField, warn } from './utils';

/**
 * If a field is validated and is valid
 */
export function useIsFieldValid(path?: MaybeReactive<string>) {
  const form = injectWithSelf(FormSymbol);
  let field = path ? undefined : inject(FieldContext);

  return computed(() => {
    if (path) {
      field = normalizeField(form?.fields.value[unref(path)]);
    }

    if (!field) {
      warn(`field with name ${unref(path)} was not found`);

      return false;
    }

    return field.meta.valid;
  });
}
