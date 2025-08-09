import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import CheckIcon from '@mui/icons-material/Check'
import i18n from '@/i18n'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const langs = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' }
]

export function LangSwitch() {
  const { i18n: i18nInst } = useTranslation()
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  const cur = i18nInst.resolvedLanguage || 'en'

  const choose = (lng: string) => () => {
    i18n.changeLanguage(lng)
    setAnchor(null)
  }

  return (
    <>
      <Tooltip title={`Language: ${cur.toUpperCase()}`}>
        <IconButton color="inherit" onClick={(e) => setAnchor(e.currentTarget)} aria-label="language">
          <LanguageIcon sx={{ color: 'black' }} />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}>
        {langs.map(l => (
          <MenuItem key={l.code} onClick={choose(l.code)}>
            <ListItemIcon>{cur === l.code ? <CheckIcon fontSize="small" /> : null}</ListItemIcon>
            <ListItemText>{l.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
