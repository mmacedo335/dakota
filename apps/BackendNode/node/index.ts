import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { status } from './middlewares/status'
import { validate } from './middlewares/validate'
import { recaptchaVerify } from './middlewares/recaptchaVerify'
import { inventoryResolvers } from './resolvers/queries/inventory'

const TIMEOUT_MS = 800

const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    code: number
  }
}

export default new Service({
  clients,
  graphql: {
    resolvers: {
      Query: {
        ...inventoryResolvers.Query,
      },
    },
  },
  routes: {
    status: method({
      GET: [validate, status],
    }),
    recaptcha: method({
      POST: [recaptchaVerify],
      GET: [recaptchaVerify], // allow simple testing via query param token
    }),
  },
})
