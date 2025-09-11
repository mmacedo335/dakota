import { IOClients } from '@vtex/api'
import { Logistics } from '@vtex/clients'

import Status from './status'
import Recaptcha from './recaptcha'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }

  public get logistics() {
    return this.getOrSet('logistics', Logistics)
  }

  public get recaptcha() {
    return this.getOrSet('recaptcha', Recaptcha)
  }
}
