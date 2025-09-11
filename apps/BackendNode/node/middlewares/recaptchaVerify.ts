import { UserInputError } from '@vtex/api'
import * as coBody from 'co-body'

interface RecaptchaBody {
  token?: string
}

export async function recaptchaVerify(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { recaptcha, apps },
    vtex: { logger, settings: inlineSettings, appId },
    req,
  } = ctx as any

  let secret = (inlineSettings && (inlineSettings as any).recaptchaSecret) as string | undefined


  if (!secret) {
    try {
  const resolvedAppId = process.env.VTEX_APP_ID || appId
      const remoteSettings = (await apps.getAppSettings(resolvedAppId)) as any
      secret = remoteSettings?.recaptchaSecret
    } catch (e) {
      logger.warn({ message: 'Failed fetching app settings', error: (e as Error).message })
    }
  }


  if (!secret) {
    logger.warn({ message: 'reCAPTCHA secret not configured' })
    throw new UserInputError('Service misconfigured')
  }


  let body: RecaptchaBody = {}
  if (!(ctx as any).request?.body) {
    try {
      if (ctx.method === 'POST' || ctx.method === 'PUT') {
  body = (await coBody.json(ctx.req)) as RecaptchaBody
      }
    } catch (e) {
      logger.warn({ message: 'Failed to parse request body', error: (e as Error).message })
      body = {}
    }
  } else {
  body = ((ctx as any).request.body as RecaptchaBody) || {}
  }

  const token = body.token || (ctx.query.token as string)

  logger.info({ message: 'recaptcha request received', hasToken: !!token })

  if (!token) {
    throw new UserInputError('Missing reCAPTCHA token')
  }

  let remoteIp: string | undefined
  try {
    remoteIp = req?.headers['x-forwarded-for']?.split(',')[0] || req?.ip
  } catch {
    remoteIp = undefined
  }

  const response = await recaptcha.verify(token, secret, remoteIp)

  ctx.status = 200
  ctx.body = {
    success: response.success,
    score: response.score,
    hostname: response.hostname,
    challenge_ts: response.challenge_ts,
    errors: response['error-codes'],
  }

  await next()
}
