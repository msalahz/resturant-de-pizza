import { memo } from 'react'
import { TextField } from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import Button from './Button'

type Props = { value: number; onChange: (val: number) => void; isLoading?: boolean; disabled?: boolean }

function TextFieldWithIncrementDecrement({ value, onChange, isLoading = false, disabled = false }: Props): JSX.Element {
  return (
    <ButtonGroup size="small" disabled={isLoading}>
      <Button size="small" disabled={isLoading || disabled} isLoading={isLoading} onClick={() => onChange(value - 1)}>
        {value > 1 ? '-' : <DeleteOutlineIcon />}
      </Button>

      <TextField
        size="small"
        value={isNaN(value) ? 0 : value}
        inputProps={{ type: 'tel', min: 0, readOnly: true, style: { textAlign: 'center' } }}
      />

      <Button size="small" disabled={isLoading || disabled} isLoading={isLoading} onClick={() => onChange(value + 1)}>
        +
      </Button>
    </ButtonGroup>
  )
}

export default memo(TextFieldWithIncrementDecrement)
