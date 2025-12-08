import React from 'react'
import {useCssHandles} from "vtex.css-handles"

import { useLogin } from './hooks/login'

// import { Container } from './styles';

interface LoginInputProps {
  id?: string
  name: string
  type?: 'email' | 'text' | 'password'
  placeholder?: string
  label?: string
  blockClass?: string
  required?: boolean
  labelRequired?: boolean
  disabled?: boolean
  onBlur?: (value: string, name: string) => void
}

const CSS_HANDLES = [
  'inputElement',
  'inputContainer',
  'label',
  'labelWrapper',
  'labelRequired',
] as const

const LoginInput: React.FC<LoginInputProps> = ({
  id,
  name,
  type = 'text',
  placeholder,
  label,
  blockClass,
  required,
  labelRequired,
  disabled,
  onBlur,
}) => {
  const { handles, withModifiers } = useCssHandles(CSS_HANDLES)
  const { handleInputChange, data, clearErrors, errors } = useLogin()

  const finalId = id ?? `${(window.crypto as any).randomUUID()}-${name}`

  const input = (
    <input
      className={withModifiers('inputElement', type, blockClass, {
        error: !!errors[name],
        disabled,
      })}
      disabled={disabled}
      id={finalId}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={handleInputChange}
      value={data[name] ?? ''}
      required={required}
      onFocus={clearErrors}
      onBlur={() => !disabled && onBlur?.(data[name] ?? '', name)}
    />
  )

  if (label || labelRequired) {
    const labelElement = <span className={handles.label}>{label}</span>

    return (
      <div
        className={`${withModifiers('inputContainer', type, blockClass, {
          error: !!errors[name],
        })} flex flex-column`}
      >
        {labelRequired ? (
          <div className={`${handles.labelWrapper} flex justify-between`}>
            {labelElement}
            <span className={handles.labelRequired}>*campo obrigatório</span>
          </div>
        ) : (
          labelElement
        )}
        {input}
      </div>
    )
  }

  return input
}

export default LoginInput
