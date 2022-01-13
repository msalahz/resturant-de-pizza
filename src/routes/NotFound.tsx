import Typography from '@mui/material/Typography'

import CenteredLayout from '../components/layout/CenteredLayout'

function NotFound(): JSX.Element {
  return (
    <CenteredLayout>
      <Typography variant="h3" sx={{ textTransform: 'uppercase' }}>
        Page Not Found
      </Typography>
    </CenteredLayout>
  )
}

export default NotFound
