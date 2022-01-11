import 'stop-runaway-react-effects/hijack'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { worker } = require('./mocks/browser')
worker.start({ onUnhandledRequest: 'bypass' }).finally()
