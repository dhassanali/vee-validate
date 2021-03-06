import { FormSymbol } from './symbols';
import { FormContext, FormValidationResult } from './types';
import { injectWithSelf, warn } from './utils';

/**
 * Validate multiple fields
 */
export function useValidateForm<TValues extends Record<string, any> = Record<string, any>>() {
  const form = injectWithSelf(FormSymbol) as FormContext<TValues> | undefined;
  if (!form) {
    warn('No vee-validate <Form /> or `useForm` was detected in the component tree');
  }

  return function validateField(): Promise<FormValidationResult<TValues>> {
    if (!form) {
      return Promise.resolve({ errors: {}, valid: true });
    }

    return form.validate();
  };
}
