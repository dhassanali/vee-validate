import { computed } from 'vue';
import { FormSymbol } from './symbols';
import { injectWithSelf, warn } from './utils';

/**
 * If the form is submitting or not
 */
export function useIsSubmitting() {
  const form = injectWithSelf(FormSymbol);
  if (!form) {
    warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
  }

  return computed(() => {
    return form?.isSubmitting.value ?? false;
  });
}
