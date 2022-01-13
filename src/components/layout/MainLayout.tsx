import { ReactNode } from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'

import Header from './Header'

function MainLayout({ children }: { children?: ReactNode }): JSX.Element {
  return (
    <>
      <Header />

      <Container disableGutters component="main" maxWidth="lg" sx={{ py: 2, height: 'calc(100% - 80px)' }}>
        <Grid container direction="column" justifyContent="flex-start" alignItems="center">
          {children}
        </Grid>
      </Container>
    </>
  )
}

export default MainLayout
