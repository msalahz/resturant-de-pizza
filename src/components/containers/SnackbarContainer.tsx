import _get from 'lodash/get'
import _noop from 'lodash/noop'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import AlertTitle from '@mui/material/AlertTitle'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import MuiSnackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import { createContext, forwardRef, ReactElement, useContext, useMemo, useState } from 'react'

export interface Props extends Partial<SnackbarOrigin>, Partial<AlertProps> {
  title?: string
  body: string
}

export interface State extends Props {
  open: boolean
}

interface SnackbarContextProps {
  openSnackbar: (props: Props) => void
  closeSnackbar: () => void
  openSuccessSnackbar: (body: string) => void
  openErrorSnackbar: (error: unknown, title: string) => void
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />
})

/* Context */
const SnackbarContext = createContext<SnackbarContextProps>({
  openSnackbar: _noop,
  closeSnackbar: _noop,
  openSuccessSnackbar: _noop,
  openErrorSnackbar: _noop,
})
SnackbarContext.displayName = 'SnackbarContext'

/* Provider */
function SnackbarProvider(props: { children: JSX.Element | JSX.Element[]; autoHideDuration?: number }): ReactElement {
  const { children, autoHideDuration = 3000 } = props
  const [state, setState] = useState<State>({
    open: false,
    body: '',
    vertical: 'top',
    horizontal: 'center',
    variant: 'filled',
    severity: 'info',
  })
  const handleOpen = (props: Props) => setState({ ...state, open: true, ...props })
  const handleClose = () => setState({ ...state, open: false })
  const handleSuccessOpen = (body: string) => handleOpen({ severity: 'success', body })

  const handleErrorOpen = (error: unknown, title: string) => {
    const msg = _get(error, 'message', undefined)
    handleOpen({
      severity: 'error',
      title: msg ? title : undefined,
      body: msg ? msg : title,
    })
  }

  const snackbarContextProps: SnackbarContextProps = {
    openSnackbar: handleOpen,
    closeSnackbar: handleClose,
    openSuccessSnackbar: handleSuccessOpen,
    openErrorSnackbar: handleErrorOpen,
  }

  return (
    <SnackbarContext.Provider value={snackbarContextProps}>
      {children}

      <MuiSnackbar
        open={state.open}
        onClose={handleClose}
        autoHideDuration={autoHideDuration}
        anchorOrigin={{ vertical: state.vertical, horizontal: state.horizontal } as SnackbarOrigin}
      >
        <Alert
          onClose={handleClose}
          variant={state.variant}
          severity={state.severity || 'info'}
          action={
            <IconButton size="small" color="inherit" sx={{ float: 'right' }} onClick={(): void => handleClose()}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {state.title && <AlertTitle>{state.title}</AlertTitle>}
          {state.body && state.body}
        </Alert>
      </MuiSnackbar>
    </SnackbarContext.Provider>
  )
}

/* useContext */
function useSnackbar(): SnackbarContextProps {
  const context = useContext(SnackbarContext)
  if (context === undefined) throw new Error(`SnackbarContext must be used within a SnackbarProvider`)

  return useMemo(() => context || {}, [context])
}

export { SnackbarProvider, useSnackbar }
