import Link, { LinkProps } from '@mui/material/Link'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-location'

interface Props extends LinkProps, Pick<RouterLinkProps, 'to'> {
  label: string
}

function HeaderLink({ label, to, ...linkProps }: Props): JSX.Element {
  return (
    <RouterLink to={to} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <Link
          component="span"
          sx={{ color: '#561D00', fontSize: 20, fontWeight: isActive ? 600 : 400, textDecoration: 'none' }}
          {...linkProps}
        >
          {label}
        </Link>
      )}
    </RouterLink>
  )
}

export default HeaderLink
