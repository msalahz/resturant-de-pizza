import { useSession } from '../containers/SessionContainer'
import { dateWithMonthsDelay, uuid } from '../../helpers/common'
import { useEffect } from 'react'

interface Props {
  render: () => JSX.Element | null
}

function PrivateRouteRPC(props: Props): JSX.Element | null {
  const { isAuthenticated, login } = useSession()
  const { render } = props

  useEffect(() => {
    // if user is not auth create a temp one-month session
    //TODO: Remove when you add authentication support
    if (!isAuthenticated()) {
      const newUserId = uuid()
      const expirationDate = dateWithMonthsDelay(1)
      login(newUserId, expirationDate)
    }
  }, [isAuthenticated, login])

  return render()
}

export default PrivateRouteRPC
