import React, { useState } from 'react'

import LoginButton from '../LoginButton'
import LoginErrorList from '../LoginErrorList'
import LoginFormElement from '../LoginFormElement'
import LoginInput from '../LoginInput'
import LoginWithAccesKeyTimer from './LoginWithAccesKeyTimer'

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
  emailPlaceholder = 'exemplo@exemplo.comaaaaaaaaaaaaa',
  emailButtonText = 'Confirmar',
  accessKeyLabel = 'Código de acesso',
  accessKeyPlaceholder = 'Ex: 123123',
  accessKeyButtonText = 'Entrar',
}) => {
  const [step, setStep] = useState<'email' | 'accessKey'>('email')
  const [loading, setIsLoading] = useState(false)
  console.log(emailPlaceholder,'a')
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
          placeholder={'aaaaaaaaaaaaaaaa'}
        />
        <LoginButton text={emailButtonText} type="submit" loading={loading} />
      </LoginFormElement>
    ),
    accessKey: (
      <LoginWithAccesKeyTimer
        accessKeyButtonText={accessKeyButtonText}
        accessKeyPlaceholder={accessKeyPlaceholder}
        accessKeyLabel={accessKeyLabel}
        loading={loading}
        setIsLoading={setIsLoading}
      />
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
