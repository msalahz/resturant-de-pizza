import CircularProgress from '@mui/material/CircularProgress'

function Spinner({ size = '100%' }: { size?: number | string } = {}): JSX.Element {
  return <CircularProgress style={{ width: size, height: size }} />
}

export default Spinner
