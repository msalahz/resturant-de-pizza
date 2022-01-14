import * as log from 'loglevel'

import { isProduction } from './common'

class Logger {
  static instance: log.Logger

  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = log
      Logger.instance.info('New Logger Created!')
      if (isProduction()) Logger.instance.disableAll()
      else Logger.instance.enableAll()
    }

    return Logger.instance
  }
}

export default Logger.getInstance()
