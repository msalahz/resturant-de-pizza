import { ReactNode } from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'

function CenteredLayout({ children }: { children?: ReactNode }): JSX.Element {
  return (
    <Container disableGutters component="main" maxWidth={false}>
      <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
        {children}
      </Grid>
    </Container>
  )
}

export default CenteredLayout
