import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from '@/shared/hooks/form-context.ts'
import TextField from '@/shared/components/formFields/textField.tsx'

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: { TextField },
  formComponents: {},
  fieldContext,
  formContext,
})
