import { computed, inject, unref } from 'vue';
import { FieldContext, FormSymbol } from './symbols';
import { MaybeReactive } from './types';
import { getFromPath, injectWithSelf } from './utils';

/**
 * Gives access to a field's current value
 */
export function useFieldValue<TValue = any>(path?: MaybeReactive<string>) {
  const form = injectWithSelf(FormSymbol);
  // We don't want to use self injected context as it doesn't make sense
  const field = path ? undefined : inject(FieldContext);

  return computed(() => {
    if (path) {
      return getFromPath(form?.values, unref(path)) as TValue | undefined;
    }

    return field?.value?.value as TValue | undefined;
  });
}
