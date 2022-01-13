import Grid from '@mui/material/Grid'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'

function FormHeader(): JSX.Element {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar variant="dense" sx={{ color: 'common.white', fontSize: 16 }}>
        <Container disableGutters maxWidth="lg" sx={{ height: 80 }} className="py-1">
          <Grid item container justifyContent="flex-start" alignItems="flex-end" sx={{ width: 135, p: 1 }}>
            <img alt="Pizzeria" src="images/pizzeria-logo.png" style={{ width: '100%' }} />
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default FormHeader
