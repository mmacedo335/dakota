import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import LoginFormElement from '../LoginFormElement'
import LoginInput from '../LoginInput'
import LoginButton from '../LoginButton'

export type LoginWithAccesKeyTimerProps = {
  accessKeyLabel?: string
  accessKeyPlaceholder?: string
  accessKeyButtonText?: string
  loading: boolean
  setIsLoading: (state: boolean) => void
}

const CSS_HANDLES = ['loginAccesKeyWithTimerContainer'] as const

const LoginWithAccesKeyTimer = ({
  accessKeyButtonText,
  accessKeyLabel,
  accessKeyPlaceholder,
  loading,
  setIsLoading,
}: LoginWithAccesKeyTimerProps) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.loginAccesKeyWithTimerContainer}>
          <LoginFormElement
            action="validateKey"
            onStart={() => setIsLoading(true)}
            onError={() => setIsLoading(false)}
          >
            <LoginInput
              name="accessKey"
              blockClass="accessKey"
              label={accessKeyLabel}
              placeholder={accessKeyPlaceholder}
            />
            <LoginButton
              text={accessKeyButtonText ?? ''}
              type="submit"
              loading={loading}
            />
          </LoginFormElement>
    </div>
  )
}

export default LoginWithAccesKeyTimer
