import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

interface RecaptchaVerifyResponse {
  success: boolean
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
  score?: number
  action?: string
}

export default class Recaptcha extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://www.google.com', context, options)
  }

  public async verify(token: string, secret: string, remoteip?: string) {
    const body = new URLSearchParams()
    body.append('secret', secret)
    body.append('response', token)
    if (remoteip) body.append('remoteip', remoteip)

    return this.http.post<RecaptchaVerifyResponse>(
      '/recaptcha/api/siteverify',
      body.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        metric: 'recaptcha-verify',
      }
    )
  }
}
