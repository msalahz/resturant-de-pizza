import Grid from '@mui/material/Grid'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'

import HeaderLink from './HeaderLink'

function FormHeader(): JSX.Element {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar variant="dense" sx={{ color: 'common.white', fontSize: 16 }}>
        <Container disableGutters maxWidth="lg" sx={{ py: 1 }}>
          <Grid container alignItems="center" justifyContent="center" spacing={3} sx={{ height: 1 }}>
            <Grid item container sx={{ width: 135 }}>
              <img alt="Pizzeria" src="/images/pizzeria-logo.png" style={{ width: '100%' }} />
            </Grid>

            <Grid item xs="auto">
              <HeaderLink to="/" label="Menu" />
            </Grid>

            <Grid item xs>
              <HeaderLink to="/orders" label="Order History" />
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default FormHeader
