import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress'

type ComponentProps = CircularProgressProps & { size?: number | string }

function Spinner({ size = '100%', ...circularProgressProps }: ComponentProps = {}): JSX.Element {
  return <CircularProgress style={{ width: size, height: size }} {...circularProgressProps} />
}

export default Spinner
