import Spinner from './Spinner'
import CenteredLayout from './CenteredLayout'

function Loading(): JSX.Element {
  return (
    <CenteredLayout>
      <Spinner size={50} />
    </CenteredLayout>
  )
}
export default Loading
