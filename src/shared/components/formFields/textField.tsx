import { useStore } from '@tanstack/react-form'
import { useId } from 'react'
import type { Ref } from 'react'
import { Input } from '@/shared/components/ui/input.tsx'
import { Label } from '@/shared/components/ui/label.tsx'
import { useFieldContext } from '@/shared/hooks/form-context.ts'

type TextFieldProps = {
  label?: string
  ref?: Ref<HTMLInputElement>
  hidden?: boolean
  required?: boolean
  readOnly?: boolean
  disabled?: boolean
  type?: 'text' | 'password' | 'email' | 'url' | 'tel' | 'file' | 'number'
  placeholder?: string
  onChange?: (value: any) => void
  value?: string
  min?: number
  max?: number
}
export default function TextField({
  label,
  disabled,
  readOnly,
  type,
  ref,
  required,
  placeholder,
  onChange,
  hidden,
  value,
  min,
  max,
}: TextFieldProps) {
  const id = useId()
  const field = useFieldContext<any>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  if (hidden) {
    return null
  }
  return (
    <>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        ref={ref}
        readOnly={readOnly}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        value={value ? value : field.state.value ? field.state.value : ''}
        id={id}
        min={min}
        max={max}
        name={field.name}
        onChange={(e) =>
          onChange
            ? onChange(
                type === 'number' ? e.target.valueAsNumber : e.target.value,
              )
            : field.handleChange(
                type === 'number' ? e.target.valueAsNumber : e.target.value,
              )
        }
      />
      {errors.length > 0 && (
        <p className="text-destructive">
          {typeof errors[0] === 'object' ? errors[0].message : errors[0]}
        </p>
      )}
    </>
  )
}
