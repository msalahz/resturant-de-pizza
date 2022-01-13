import MuiButton, { ButtonProps } from '@mui/material/Button'
import { forwardRef, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react'

import Spinner from '../layout/Spinner'

export type Ref = HTMLButtonElement
type ComponentProps = ButtonProps & { isLoading?: boolean; target?: string }

const Button: ForwardRefExoticComponent<PropsWithoutRef<ComponentProps> & RefAttributes<HTMLButtonElement>> =
  forwardRef<Ref, ComponentProps>((props: ComponentProps, buttonRef) => {
    const { isLoading, color = 'primary', variant = 'outlined', children, ...rest } = props

    return (
      <MuiButton ref={buttonRef} color={color} variant={variant} {...rest}>
        {isLoading ? <Spinner size={24} /> : props.children}
      </MuiButton>
    )
  })

Button.displayName = 'Button'

export default Button
