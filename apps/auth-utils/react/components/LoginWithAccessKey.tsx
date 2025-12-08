import React, { useState } from 'react'

import LoginButton from '../LoginButton'
import LoginErrorList from '../LoginErrorList'
import LoginFormElement from '../LoginFormElement'
import LoginInput from '../LoginInput'

// import { Container } from './styles';

interface LoginWithAccessKeyProps {
  emailLabel?: string
  emailPlaceholder?: string
  emailButtonText?: string
  accessKeyLabel?: string
  accessKeyPlaceholder?: string
  accessKeyButtonText?: string
}

const LoginWithAccessKey: React.FC<LoginWithAccessKeyProps> = ({
  emailLabel = 'E-mail',
  emailPlaceholder = 'exemplo@exemplo.com',
  emailButtonText = 'Confirmar',
  accessKeyLabel = 'Código de acesso',
  accessKeyPlaceholder = 'Ex: 123123',
  accessKeyButtonText = 'Entrar',
}) => {
  const [step, setStep] = useState<'email' | 'accessKey'>('email')
  const [loading, setIsLoading] = useState(false)

  const DICT = {
    email: (
      <LoginFormElement
        action="sendKey"
        onStart={() => setIsLoading(true)}
        onSuccess={() => setStep('accessKey')}
        onEnd={() => setIsLoading(false)}
      >
        <LoginInput
          name="email"
          type="email"
          blockClass="email"
          label={emailLabel}
          placeholder={emailPlaceholder}
        />
        <LoginButton text={emailButtonText} type="submit" loading={loading} />
      </LoginFormElement>
    ),
    accessKey: (
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
          text={accessKeyButtonText}
          type="submit"
          loading={loading}
        />
      </LoginFormElement>
    ),
  }

  return (
    <>
      {DICT[step]}
      <LoginErrorList />
    </>
  )
}

export default LoginWithAccessKey
