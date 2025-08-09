import { TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder }: Props) {
  const { t } = useTranslation()
  const handle = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)
  return (
    <TextField
      fullWidth
      value={value}
      onChange={handle}
      placeholder={placeholder ?? t('people.searchPlaceholder')}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton onClick={() => onChange('')} edge="end" aria-label="clear">
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  )
}
